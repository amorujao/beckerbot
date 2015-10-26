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
	// animals
	["Hawks", "Eagles"],
	["Velociraptors", "Tyrannosaurus Rex"],
	["Cobras", "Vipers"],
	["Bulls", "Bears"],
	["Wolves", "Coyotes"],
	["Sharks", "Killer Whales"],
	["Cobras", "Pythons"],
	["Leopards", "Cheetahs"],
	["Scorpions", "Snakes"],

	// movies & animated series
	["Crouching Tigers", "Hidden Dragons"]
	["Cobra Kai Dojo", "Miyagi Dojo"],
	["Jedi", "Sith"],
	["Decepticons", "Transformers"],
	["X-Men", "Watchmen"],
	["A-Team", "Expendables"],
	["Reservoir Dogs", "Inglourious Basterds"],

	// sci-fi channel movies
	["Mega Python", "Gatoroid"],
	["Dinocroc", "Supergator"],
	["Komodo", "Cobra"],//technically these would also fit the animals category
	["Piranhaconda", "Frankenfish"],
	
	// funny modified versions of real teams
	["Borussia D'outro mundo", "Bayern Mugido"],
	["Arse 'n' all", "Aston Vanilla"],
	["Liquor Pool FC", "Man-Chest-Hair United"],
	["Queens Park Strangers", "Manchester Titty"],
	["Enter 'Me Lamb", "Jewventus"]

	// random
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
