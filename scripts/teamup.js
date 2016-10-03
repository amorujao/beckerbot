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
//  hubot teamup <players> - Create two teams with comma separated players (to use rankings/nicknames, use player initials)
//  hubot futsal teamup=<players> team1=<team 1 players> team2=<team 2 players> type=<random|ranking>- Create two teams with the given players and pre-populate each team with at least 1 player each
//  hubot futsal get stats <player> - Get win/draw/loss stats for an individual player
//  hubot futsal set stats <player> <wins>,<draws>,<losses> - Set win/draw/loss stats for an individual player
//  hubot futsal show ranking - Get current futsal rankings based on previous matches
//
//Author:
//  rferreira

module.exports = function(robot) {

	// each item: [<aliases>, <nicknames>]
	// <aliases>: array of names to be matched
	// <nicknames>: array of nicknames to use for player (one will be picked at random)
	var users = [
	[["am", "andre", "andré"], ["André Morujão"]],
	[["cb", "barbosa"], ["Captain Barbossa"]],
	[["cs", "silva"], ["Carlos Fucking Silva"]],
	[["gs", "guilherme", "saraiva", "guilherme saraiva"], ["Guilherme Saraiva"]],
	[["ja", "joana araujo"], ["Joana Araujo"]],
	[["jd", "jose duraes"], ["José Durães"]],
	[["jm", "joao", "joão"], ["John The Rock Macedo"]],
	[["joao morais", "joão morais", "morais"], ["João Morais"]],
	[["jb", "jorge", "batista", "baptista", "jorge batista", "jorge baptista"], ["Jorge o Mágico", "Magic Jorge XXL"]],
	[["jc", "jose carlos", "josé carlos", "ze carlos", "zé carlos", "medeiros"], ["José Carlos"]],
	[["jr", "jose", "josé", "jose ribeiro", "josé ribeiro"], ["Zé Maxi Ribeiro", "Zé Payet Ribeiro"]],
	[["ju", "joana", "cerejo", "joana cerejo"], ["Joana Cerejo"]],
	[["ns", "nuno", "nuno sousa"], ["Nuno Sousa"]],
	[["pd", "paulo", "dias", "paulo dias"], ["Paulo Dias"]],
	//[["pp", "pinho", "paulo pinho"], ["Paulo Pinho"]],
	[["pv", "pedro", "vieira", "pedro vieira"], ["Pedro Vieira"]],
	[["rg", "ricardo", "gomes", "ricardo gomes"], ["Ricardo Cheetah Gomes"]],
	[["rf", "rui ferreira", "ferreira"], ["Rui Ferreira"]],
	[["rt", "rui torres"], ["Rui Torres"]],
	[["rp", "rui pereira", "milks"], ["Milks"]],
	[["sa", "sergio azevedo", "sérgio azevedo", "azevedo"], ["Sérgio Azevedo"]],
	//[["sd", "sergio dias", "sérgio dias"], ["Sérgio El Gato Dias", "Sérgio Zlatan Dias", "Sérgio Higuita Dias", "Sérgio El Kitty Dias"]],
	//[["vt", "vasco"], ["Vasco"]],
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

	function getAllStats(msg) {
    	var statsString = msg.robot.brain.get("futsal/stats");
    	var stats = JSON.parse(statsString);
    	if(Object.prototype.toString.call(stats) === '[object Object]') {
    		return [parseInt(stats[0]), parseInt(stats[1]), parseInt(stats[2])];
    	}
		if (stats !== null) {
			msg.send("Clearing badly formatted stats data: " + JSON.stringify(stats));
		}
		return {};
	}

	function setAllStats(msg, stats) {
		if(!Object.prototype.toString.call(stats) === '[object Object]') {
			msg.send("Clearing badly formatted stats data: " + JSON.stringify(stats));
			stats = {};
		}
		msg.robot.brain.set("futsal/stats", JSON.stringify(stats));
	}

	function getStats(msg, user) {
		var stats = getAllStats(msg)[user];
		if(Object.prototype.toString.call(stats) === '[object Array]' && stats.length == 3) {
			return stats;
		}
		if (stats === undefined) {
			stats = [0, 0, 0];
		} else {
			msg.send("Invalid format for stats: " + JSON.stringify(stats));
			stats = [0, 0, 0];
			msg.send("Replacing with: " + JSON.stringify(stats));
		}
		return stats;
	}

    function setStats(msg, user, stats) {
		if(Object.prototype.toString.call(stats) !== '[object Array]' || stats.length != 3) {
			msg.send("Invalid format for stats: " + JSON.stringify(stats));
			stats = [0, 0, 0];
			msg.send("Replacing with: " + JSON.stringify(stats));
		}
		var allStats = getAllStats(msg);
   		allStats[user] = stats;
   		setAllStats(msg, allStats);
    }

	function getPlayerScore(msg, user) {
		var stats = getStats(msg, user);
		// simpler scoring: 3 points for victories, 1 point for draws, 0 points for losses
		// return stats[0] * 3 + stats[1] * 1;
		var played = stats[0] + stats[1] + stats[2];
		if (played == 0) {
			return 0;
		}
		var winLossBalance = stats[0] - stats[2];
		var winRatio = stats[0] / played;
		return winLossBalance + winRatio / 10;
	}

	function sortPlayers(msg, players) {
		players.sort(function (player1, player2) {
			var score1 = getPlayerScore(msg, player1);
			var score2 = getPlayerScore(msg, player2);
			if (score1 == score2) {
				// randomize order for players with the same score
				return Math.floor(Math.random() * 3);
			}
			return score2 - score1;
		});
	}

	function teamup(msg, players, team1, team2, type) {

		if (type === "random") {
			// random sort
			shuffle(players);
		} else {
			// sort based on ranking
			sortPlayers(msg, players);
		}

		// set up teams with the following distribution:
		// 1. first player goes to team A
		// 2. players #2 and #3 go to team B
		// 3. players #4 and #5 go to team A
		// 4. ... and so on, until all players are placed in teams
		var teams = [team1, team2];
		var team = team1.length == team2.length ? Math.floor(Math.random() * 2) :
			team1.length > team2.length ? 1 : 0;
		for (var player = 0; player < players.length; player++) {
			teams[team].push(players[player]);
			var otherTeam = (team + 1) % 2;
			if (teams[team].length > teams[otherTeam].length) {
				team = otherTeam;
			}
		}

        // replace aliases with nicknames
		for (var t = 0; t < teams.length; t++) {
			for (var p = 0; p < teams[t].length; p++) {
				teams[t][p] = getName(teams[t][p]);
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

    robot.respond(/teamup (.+)/i, function(msg) {
      var players = msg.match[1].split(/\s?,\s?/);
      teamup(msg, players, [], [], "ranking");
    });

    robot.respond(/futsal teamup players=(.+) team1=(.+) team2=(.+) type=(.+)?/i, function(msg) {
      var players = msg.match[1].split(/\s?,\s?/);
      var team1 = msg.match[2].split(/\s?,\s?/);
      var team2 = msg.match[3].split(/\s?,\s?/);
      var type = msg.match[4];
      teamup(msg, players, team1, team2, type);
    });

    robot.respond(/futsal debug get stats/i, function(msg) {
      var stats = getAllStats(msg);
      msg.send("Futsal stats:\n" + JSON.stringify(stats));
    });

    robot.respond(/futsal debug set stats (.+)/i, function(msg) {
      var stats = msg.match[1];
      setAllStats(msg, JSON.parse(stats));
      msg.send("Futsal stats saved:\n" + JSON.stringify(getAllStats(msg)));
    });

    robot.respond(/futsal (show|get) stats (.+)/i, function(msg) {
      var player = msg.match[2];
      var stats = getStats(msg, player);
      msg.send(getName(player) + ": " + stats[0] + " wins " + stats[1] + " draws " + stats[2] + " losses");
    });

    robot.respond(/futsal set stats (.+) (\d+),(\d+),(\d+)/i, function(msg) {
      var player = msg.match[1];
      var wins = msg.match[2];
      var draws = msg.match[3];
      var losses = msg.match[4];
      var stats = [wins, draws, losses];
      setStats(msg, player, stats);
      msg.send("Stats saved for " + player + ": " + stats[0] + " wins " + stats[1] + " draws " + stats[2] + " losses");
    });

	robot.respond(/futsal (.+ )?ranking/i, function(msg) {
		var players = [];
		var action = msg.match[1];
		if (action != "show " && action != "debug ") {
			if (action !== undefined) {
				msg.send("Invalid action: ' " + action + "'\nUsing ' show ' instead.");
			}
			action = "show ";
		}
		for (var i = 0; i < users.length; i++) {
			var u = users[i][0][0];
			var s = getStats(msg, u);
			// only show players with at least 2 matches played
			if ((s[0] + s[1] + s[2]) >= 2) {
				players.push(u);
			}
		}

		// sort players according to their ranking
		sortPlayers(msg, players);
		var ranking = [];
		var lastScore = 999999999999;
		for (var i = 0, rank = 0; i < players.length; i++) {
			var player = players[i];
			var score = getPlayerScore(msg, player);
			if (score != lastScore) {
				rank = i + 1;
			}
			var rankLine = "#" + rank + " " + getName(player);
			if (action == "debug ") {
				var stats = getStats(msg, player);
				rankLine += " W:" + stats[0] + " D:" + stats[1] + " L:" + stats[2] + " " + score;
			}
			ranking.push(rankLine);
			lastScore = score;
		}
		if (ranking.length > 0) {
			msg.send(ranking.join("\n"));
		} else {
			msg.send("There are currently no players statistics available.");
		}
	});

};
