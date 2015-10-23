//Description
//  Creates random teams with people.
//
//Dependencies:
//  None
//
//Configuration:
//  None
//
//Commands:
//  hubot teamup <players> - Create two teams with comma separated players
//
//Author:
//  rferreira

module.exports = function(robot) {

    function shuffle(arr){
        for(var j, x, i = arr.length; i; j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    };

    robot.hear(/teamup (.+)/i, function(msg) {
        var players = msg.match[1].split(/\s?,\s?/);
        shuffle(players);

        var midPoint = Math.floor(players.length / 2);
        var team1 = [];
        var team2 = [];
        for(var i = 0; i < players.length; i++){
            if(i < midPoint){
                team1.push(players[i]);
            }
            else{
                team2.push(players[i]);
            }
        }

        var team1Name = "Team A";
        var team2Name = "Team B";

        msg.send(team1Name + ": " + team1 + "\n" + team2Name + ": " + team2);
    });
};