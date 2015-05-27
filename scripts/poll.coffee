# Description
#   Generates a poll.
#   Hubot will automatically end the poll when everyone has answered.
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   hubot poll <question> -a <answers> - Create a poll with comma separated answers
#   hubot (end|stop|close) poll - End current poll and show results
#   hubot vote <number> - Cast your vote
#   hubot previous poll - Previous poll results
#   hubot poll status - Show current poll results
#
# Notes:
#   $ hubot poll How cool is that? -a Amazeballz, Very Nice, Nice, Boring
#   $ hubot vote 1
#   $ hubot poll status
#   $ hubot end poll
#   $ hubot previous poll
#
# Author:
#   EtienneLem

class Poll

  constructor: (@robot) ->
    @allUsers = []
    for k,user of @robot.brain.data.users
      @allUsers.push(user)

    @poll = null
    @previousPoll = null

    @robot.respond /poll (.*) -a (.*)/i, this.createPoll
    @robot.respond /(end|stop|close) poll/i, this.endPoll
    @robot.respond /(v|b)?ote ([0-9]*)/i, this.vote
    @robot.respond /previous poll/i, this.showPreviousPoll
    @robot.respond /poll( status)?$/i, this.showPollStatus

  getUser: (msg) ->
    msg.message.user

  getUserDisplayName: (user) ->
    name = user.name
    if user.real_name
      names =user.real_name.split(" ")
      name = names[0]
    return name

  # Poll management
  createPoll: (msg) =>
    answers = this.createAnswers(msg.match[2])
    return msg.send('Please provide at least 2 answers') if answers.length <= 1

    user = this.getUser(msg)
    @poll = { user: user, question: msg.match[1], answers: answers, cancelled: 0, voters: {} }

    msg.send """#{user.name} asked: #{@poll.question}
    0. [Decline to vote]
    #{this.printAnswers()}
    """

  endPoll: (msg) =>
    return msg.send('There’s currently no poll to end.') unless @poll

    msg.send """Here are the results for “#{@poll.question}”:
    #{this.printResults(@poll, true)}
    This poll was brought to you by #{@poll.user.name}
    """

    @previousPoll = @poll
    @poll = null

  showPreviousPoll: (msg) =>
    return msg.send('There’s currently no previous poll.') unless @previousPoll

    msg.send """Here are the results for “#{@previousPoll.question}”:
    #{this.printResults(@previousPoll, true)}
    This poll was brought to you by #{@previousPoll.user.name}
    """

  showPollStatus: (msg) =>
    return msg.send('There’s currently no poll.') unless @poll

    msg.send """The current poll results for “#{@poll.question}” are:
    #{this.printResults(@poll, false)}
    This poll is being brought to you by #{@poll.user.name}
    """

  # Ansers management
  createAnswers: (answers) ->
    { text: answer, votes: 0 } for answer in answers.split(/\s?,\s?/)

  printAnswers: ->
    ("#{i+1}. #{answer.text}" for answer, i in @poll.answers).join("\n")

  printResults: (poll, sort_answers) ->
    if(sort_answers)
      poll.answers.sort (a, b) ->
        return 1 if (a.votes < b.votes)
        return -1 if (a.votes > b.votes)
        0

    non_voters = []
    for u in @allUsers
      if @poll.voters[u.name] == undefined
        non_voters.push(u)

    results = ''
    results += ("#{answer.text} (#{answer.votes})" for answer in poll.answers).join("\n")
    results += "\n\nOut of #{Object.keys(poll.voters).length} total voters, #{poll.cancelled} declined to vote."
    if non_voters.length > 0
      results += "\nUsers who haven't voted yet: "
      for u, idx in non_voters
        if idx > 0
          results += ", "
        results += getUserDisplayName(u)
    return results

  # Vote management
  vote: (msg) =>
    number = parseInt(msg.match[2])
    user = this.getUser(msg)

    # Errors
    return msg.send('Sorry, there’s no pending poll at the moment.') unless @poll
    return msg.send("There are only #{@poll.answers.length} answers.") if number > @poll.answers.length

    # User already voted (no problem, change it!)
    changingVote = false
    if (userAnswer = @poll.voters[user.name]) != undefined
      changingVote = true
      if userAnswer is 0
        @poll.cancelled--
      else
        @poll.answers[userAnswer - 1].votes--

    # Save user vote
    @poll.voters[user.name] = number
    votersCount = Object.keys(@poll.voters).length

    # Decline vote
    if number is 0
      @poll.cancelled++
      msg.send("#{user.name} decided not to vote.")

    # Cast vote
    else
      votedAnswer = @poll.answers[number - 1]
      votedAnswer.votes++
      if changingVote
        msg.send "#{user.name} changed vote to “#{votedAnswer.text}”"
      else
        msg.send "#{user.name} voted “#{votedAnswer.text}”"

    # Check if all users have voted
    #return if votersCount < @robot.brain.data.users.length - 1
    #msg.send "It looks like all users casted their vote. The poll can be closed."

module.exports = (robot) ->
  new Poll(robot)
