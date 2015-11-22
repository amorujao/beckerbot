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
//  hubot teamup <players> - Create two teams with comma separated players (to use rankings, use player initials)
//  hubot futsal get stats <player> - Get win/draw/loss stats for an individual player
//  hubot futsal show ranking - Get current futsal rankings based on previous matches
//
//Author:
//  rferreira

module.exports = function(robot) {

	// each item: [<aliases>, <nicknames>]
	// <aliases>: array of names to be matched
	// <nicknames>: array of nicknames to use for player (one will be picked at random)
	var users = [
	[["am", "andre", "andré"], ["André"]],
	[["cb", "barbosa"], ["Captain Barbossa"]],
	[["cs", "silva"], ["Carlos Fucking Silva"]],
	[["jm", "joao", "joão"], ["John The Rock Macedo"]],
	[["joao morais", "joão morais", "morais"], ["João Morais"]],
	[["jb", "jorge", "batista", "baptista", "jorge batista", "jorge baptista"], ["Jorge o Mágico", "Magic Jorge XXL"]],
	[["jc", "jose carlos", "josé carlos", "ze carlos", "zé carlos", "medeiros"], ["José Carlos"]],
	[["jr", "jose", "josé", "jose ribeiro", "josé ribeiro"], ["Zé Maxi Ribeiro"]],
	[["ns", "nuno"], ["Nuno"]],
	[["pd", "paulo", "dias", "paulo dias"], ["Paulo"]],
	[["pp", "pinho", "paulo pinho"], ["Paulo Pinho"]],
	[["rg", "ricardo", "gomes", "ricardo gomes"], ["Ricardo Cheetah Gomes"]],
	[["rf", "rui"], ["Rui"]],
	[["sa", "sergio azevedo", "sérgio azevedo", "azevedo"], ["Sérgio Azevedo"]],
	[["sd", "sergio dias", "sérgio dias"], ["Sérgio El Gato Dias", "Sérgio Zlatan Dias", "Sérgio Higuita Dias"]],
	[["vt", "vasco"], ["Vasco"]],
    ];

	var teamPairs = [

	// animals
	["Hawks", "Eagles", "https://f1.bcbits.com/img/a3151354777_10.jpg"],
	["Velociraptors", "Tyrannosaurus Rex", "http://img15.deviantart.net/9d52/i/2011/133/0/3/jp_t_rex_vs__velociraptors_by_yankeetrex-d3g87qw.jpg"],
	["Cobras", "Vipers"],
	["Bulls", "Bears", "http://wwwcdn3.wyattresearch.com/wp-content/uploads/2014/07/470467481.jpg"],
	["Wolves", "Coyotes"],
	["Sharks", "Killer Whales", "http://www.lifeintheknow.com/wp-content/uploads/2014/07/killer-whale-kills-great-white.jpg"],
	["Cobras", "Pythons", "http://37.media.tumblr.com/tumblr_ma9q1yebe21ro8kzyo1_1280.jpg"],
	["Leopards", "Cheetahs", "https://s3.amazonaws.com/assets.whatiworeblog.com/2013/November/Nov+09+%7C+Meow/Cheetah+vs+Leopard+Print.jpg"],
	["Scorpions", "Snakes"],

	// movies & animated series
	["Crouching Tigers", "Hidden Dragons"],
	["Cobra Kai Dojo", "Miyagi Dojo", "http://3.bp.blogspot.com/-MbRNpe9HnYQ/TnJpqaJBszI/AAAAAAAAAao/GQKLXtzS7pY/s1600/dojo2.jpg"],
	["Jedi", "Sith", "http://images-cdn.moviepilot.com/image/upload/c_fill,h_212,w_500/t_mp_quality/perso_skywalker_luke_17-jedi-vs-sith-who-are-the-real-good-guys-star-wars-episode-7-hopes-jpeg-170604.jpg"],
	["Decepticons", "Autobots", "http://openwalls.com/image/15508/thumb3_transformers_autobot_vs_decepticons_1.jpg"],
	["X-Men", "Watchmen"],
	["A-Team", "Expendables"],
	["Reservoir Dogs", "Inglourious Basterds"],

	// sci-fi channel movies
	["Mega Python", "Gatoroid", "http://ia.media-imdb.com/images/M/MV5BMjEwODY1ODQ3Nl5BMl5BanBnXkFtZTgwMTAyMjM5MTE@._V1_SX640_SY720_.jpg"],
	["Dinocroc", "Supergator"],
	["Komodo", "Cobra"],//technically these would also fit the animals category
	["Piranhaconda", "Frankenfish"],
	
	// funny modified versions of real teams
	["Borussia D'outro mundo", "Bayern Mugido", "http://blogstorage.s3.amazonaws.com/upload/SportsBlogcom/1133065/0880132001443811880_filepicker.jpg"],
	["Arse 'n' all", "Aston Vanilla", "http://www.arsenalinsider.com/wp-content/uploads/2013/08/arsenal-aston-villa-premiership-opener.jpg"],
	["Liquor Pool FC", "Man-Chest-Hair United", "http://www.total-goal.com/wp-content/uploads/2014/08/liverpool_man_united1.jpg"],
	["Queens Park Strangers", "Manchester Titty", "http://api.ning.com/files/n9PWw31tPWylJCHSFIMK9rzZKqXve59Mhc-MHSZ3LOgFAyMeolcXycwtx8SQDTZUijPe2CU2pFN4FpsWh9lDb0i5gzZ1YgJM/QPRvsManCity.jpg"],
	["Enter 'Me Lamb", "Jewventus", "http://www.sempreinter.com/wp-content/uploads/2015/05/Inter-vs-Juventus.jpg"]

	// random
	];

    function shuffle(arr){
        for(var j, x, i = arr.length; i; j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    };

	function getName(alias) {
		var aliasLowerCase = alias.toLowerCase();
        for (var i = 0; i < users.length; i++) {
            var nicks = users[i];
            var names = nicks[0];
            for (var j = 0; j < names.length; j++) {
                if (aliasLowerCase === names[j]) {
                    nicks = nicks[1];
                    return nicks[Math.floor(Math.random() * nicks.length)];
                }
            }
        }
        return alias;
    }

	// TODO: implement persistent stats
	var stats = {
		"am":[1,1,1],
		"jr":[0,0,1],
		"rf":[2,1,0],
		"jb":[1,0,0],
		"pd":[0,0,2],
		"rg":[1,1,1],
		"jc":[1,1,0],
		"jm":[0,1,2],
		"sa":[1,0,1],
		"sd":[1,0,0]
	};
    function getStats(user) {
        if (user in stats) {
            return stats[user];
        } else {
            return [0, 0, 0];
        }
    }

	function getPlayerScore(user) {
		var stats = getStats(user);
		// simpler scoring: 3 points for victories, 1 point for draws, 0 points for losses
		// return stats[0] * 3 + stats[1] * 1;
		var played = stats[0] + stats[1] + stats[2];
		if (played == 0) {
			return 0;
		}
		var winLossBalance = stats[0] - stats[2];
		var winRatio = stats[0] / played;
		return winLossBalance * 10 + winRatio;
	}

	function sortPlayers(players) {
		players.sort(function (player1, player2) {
			var score1 = getPlayerScore(player1);
			var score2 = getPlayerScore(player2);
			if (score1 == score2) {
				// randomize order for players with the same score
				return Math.floor(Math.random() * 3);
			}
			return score2 - score1;
		});
	}

	function teamup(msg, players, rivals) {

		//TODO: add support for rivals
		if (rivals.length > 0) {
			msg.send("Sorry, rival support is not implemented yet.");
			return;
		}

		// use ranking to sort players
		sortPlayers(players);

        // replace aliases with nicknames
        for (var i = 0; i < players.length; i++) {
            players[i] = getName(players[i]);
        }

		// set up teams with the following distribution:
		// 1. first player goes to team A
		// 2. players #2 and #3 go to team B
		// 3. players #4 and #5 go to team A
		// 4. ... and so on, until all players are placed in teams
		var teams = [[], []];
		for (var player = 0, team = Math.floor(Math.random() * 2); player < players.length; player++) {
			teams[team].push(players[player]);
			var otherTeam = (team + 1) % 2;
			if (teams[team].length > teams[otherTeam].length) {
				team = otherTeam;
			}
		}

        // randomize team names
        var teamNames = teamPairs[Math.floor(Math.random() * teamPairs.length)];

        // display teams & players
        if (teamNames.length == 3) {
            msg.send(teamNames[2]);
        }
        msg.send(":soccer: *" + teamNames[0] + "*: " + teams[0].join(", ") + "\n:shirt: *" + teamNames[1] + "*: " + teams[1].join(", "));
    };

    robot.hear(/teamup (.+)/i, function(msg) {
      var players = msg.match[1].split(/\s?,\s?/);
      teamup(msg, players, []);
    });

    // Work in progress; we'll need to update the previous regex to not match this version, or instead use only the version below
    /*robot.hear(/teamup players (.+) rivals (.+)/i, function(msg) {

        var players = msg.match[2].split(/\s?,\s?/);
        var rivals = msg.match[3].split(/\s?,\s?/);

        //TODO: validate and arrange rivals

        teamup(msg, players, rivals);
    });*/

    robot.hear(/futsal (show|get) stats (.+)/i, function(msg) {
      var player = msg.match[2];
      var stats = getStats(player);
      msg.send(getName(player) + ": " + stats[0] + " wins " + stats[1] + " draws " + stats[2] + " losses");
    });

	robot.hear(/futsal (.+) ranking/i, function(msg) {
		var players = [];
		var action = msg.match[1];
		if (action != "show" && action != "debug") {
			msg.send("Invalid action: '" + action + "'\nUsing 'show' instead.");
			action = "show";
		}
		for (var i = 0; i < users.length; i++) {
			var u = users[i][0][0];
			var s = getStats(u);
			// only show players with at least 1 match played
			if (s[0] + s[1] + s[2] > 0) {
				players.push(u);
			}
		}
		// sort players according to their ranking
		sortPlayers(players);
		var ranking = [];
		var lastScore = 999999999999;
		for (var i = 0, rank = 0; i < players.length; i++) {
			var player = players[i];
			var score = getPlayerScore(player);
			if (score != lastScore) {
				rank = i + 1;
			}
			var rankLine = "#" + rank + " " + getName(player);
			if (action == "debug") {
				rankLine += " " + score;
			}
			ranking.push(rankLine);
			lastScore = score;
		}
		msg.send(ranking.join("\n"));
	});

};
