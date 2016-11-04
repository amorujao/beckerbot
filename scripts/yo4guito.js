// Description:
//   Random comments on yo4guito
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   None

module.exports = function(robot) {
  //user placeholder: "#user#"

  function sendMessage(msg, options, odds, cooldown, cooldownKey) {
    if (typeof odds === 'undefined') {
      odds = 1;
    }
    if (typeof cooldown === 'undefined') {
      cooldown = 0;
    }
    if (typeof cooldownKey === 'undefined') {
      cooldownKey = '';
    }
    if (Math.random() <= odds) {
      if (cooldown > 0 && cooldownKey != '') {
        cooldownKey = "last_cooldown_sent_" + cooldownKey;
        var lastMsgTime = msg.robot.brain.get(cooldownKey);
        var now = new Date().getTime();
        if (lastMsgTime != undefined && now <= (lastMsgTime + cooldown)) {
          return;
        }
        msg.robot.brain.set(cooldownKey, now);
      }
      var user = msg.message.user.name;
      if (msg.message.user.real_name != undefined) {
        var names = msg.message.user.real_name.split(" ");
        user = names[0];
      }
      message = msg.random(options).replace("#user#", user);
      msg.send(message);
    }
  }

  function filterChannel(msg) {
    return msg.message.user.room != "yo4guito" && msg.message.user.room != "hubot" && msg.message.user.room != 'andre-tests' && msg.message.user.room != 'Shell';
  }

  robot.hear(/\byo\b/i, function(msg) {
    if (filterChannel(msg)) {
      return;
    }

    sendMessage(msg, [
      "https://media.giphy.com/media/ofMzOyInSTvA4/giphy.gif",
      "https://media2.giphy.com/media/9thduMKTL4Dcc/200.gif#3",
      "https://media4.giphy.com/media/cZQdySoakyjbq/200.gif#7",
      "https://media.giphy.com/media/3oz8xLBAFDyupo6jcs/source.gif",
      "https://media0.giphy.com/media/3o6Zt3AX5mSM29lGUw/200.gif#9",
      "https://media.giphy.com/media/5fBH6zoAQg9dHK2ttsc/giphy.gif",
      "https://media.giphy.com/media/xT8qBfxbxaS8DRPnUY/giphy.gif",
      "https://media.giphy.com/media/YEcGkzJuIqBqM/giphy.gif",
      "https://media.giphy.com/media/3oz8xZGfHArTvh99YI/giphy.gif",
      "https://media.giphy.com/media/13yNFN1TlNCjC0/giphy.gif"
      ], 1);
  });

};
