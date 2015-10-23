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

    var teamPairs = [
        ["Tigers", "Dragons"],
        ["Hawks", "Eagles"],
        ["Velociraptors", "Tyrannosaurus Rex"],
        //["Cobra Kai Dojo", "Miyagi Dojo"],
        ["Cobras", "Vipers"],
        //["Jedi", "Sith"],
        ["Bulls", "Bears"],
        ["Wolves", "Coyotes"],
        ["Sharks", "Orcas"],
        ["King Cobras", "Pythons"],
        ["Leopards", "Cheetahs"],
        ["Scorpions", "Snakes"]
    ];

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

        var teamNames = teamPairs[Math.floor(Math.random() * teamPairs.length)];

        msg.send(teamNames[0] + ": " + team1.join(", ") + "\n" + teamNames[1] + ": " + team2.join(", "));
    });
};
