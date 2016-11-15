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
//  hubot teamup <players> - Generate several team options using different team-up strategies so that players can vote for their favorite one
//  hubot futsal teamup players=<players> team1=<team 1 players> team2=<team 2 players> type=<random|alternating|alternating-pairs> ranking-history=<number of matches> - Create two teams with the given players (or just set '-' instead of the player list to skip this) and pre-populate each team with at least 1 player each; ranking-history is the number of matches (from the most recent) to take into account; to use the full ranking, just use a big number like 999
//  hubot futsal rank - Get futsal rankings based on all past matches
//  hubot futsal rank detailed - Get futsal rankings with number of wins / draws / losses for each player
//  hubot futsal rank last <N> - Get futsal rankings based on the last N matches
//  hubot futsal stats - Get futsal statistics for all players
//  hubot futsal stats <player> - Get futsal statistics for <player>
//  hubot futsal matches - Get the list of all past matches
//  hubot futsal last match - Get the details for the last recorded match
//
//Author:
//  rferreira

module.exports = function(robot) {

	// each item: {date:"YYYY-MM-DD", players:[[<team 1 players],[<team 2 players>]], score:[<team 1 goals>, <team 2 goals>]}
	var matches = [
		{date:"2015-11-16", players:[["rf", "Sérgio Dias", "am", "Alcobaça", "jc"],["rg", "jm", "sa", "jr", "pd"]], score:[14, 7]},
		{date:"2015-11-23", players:[["rf", "Sérgio Dias", "am", "Alcobaça", "jc"],["rg", "jm", "sa", "jr", "pd"]], score:[7, 3]},
		{date:"2015-11-30", players:[["am", "rg", "Sérgio Dias", "jm"],["jc", "jr", "pd", "sa"]], score:[7, 12]},
		{date:"2016-01-12", players:[["Sérgio Dias", "ja", "jc", "pd", "rg"],["sa", "rf", "ju", "jr", "jm"]], score:[12, 10]},
		{date:"2016-05-02", players:[["rf", "rg", "Rui Sousa", "ns"],["jr", "am", "Rui Brito", "jm"]], score:[14, 7]},
		{date:"2016-05-09", players:[["rf", "rg", "sa", "Alcobaça"],["jr", "am", "jm", "ns"]], score:[18, 10]},
		{date:"2016-05-17", players:[["rf", "rg", "sa", "ns"],["am", "Alcobaça", "Estrilho", "Fontela"]], score:[14, 12]},
		{date:"2016-05-23", players:[["am", "Estrilho", "jc", "jr"],["sa", "jm", "Alcobaça", "rp"]], score:[11, 13]},
		{date:"2016-06-13", players:[["am", "Estrilho", "jc", "jr", "Alcobaça"],["sa", "jm", "Fontela", "rp", "ns"]], score:[9, 9]},
		{date:"2016-06-20", players:[["am", "Estrilho", "jr", "sa"],["jm", "Fontela", "rp", "rg"]], score:[13, 15]},
		{date:"2016-07-19", players:[["am", "jd", "jb", "sa"],["jm", "jr", "Fontela", "ns"]], score:[9, 10]},
		{date:"2016-08-22", players:[["am", "jd", "rf", "pv", "jc"],["jm", "rp", "jr", "ns"]], score:[9, 10]},
		{date:"2016-08-29", players:[["am", "rf", "jc", "Rui Sousa"],["jm", "rp", "jr", "ns"]], score:[11, 13]},
		{date:"2016-09-05", players:[["am", "jm", "ns", "pv"],["jr", "rp", "jc", "jd"]], score:[14, 8]},
		{date:"2016-09-12", players:[["am", "jm", "ns", "sa"],["jr", "jc", "jd", "pv"]], score:[11, 6]},
		{date:"2016-09-19", players:[["am", "rf", "rg", "jm"],["ns", "jc", "pv", "sa"]], score:[13, 11]},
		{date:"2016-09-26", players:[["am", "rf", "jm", "rp", "pv"],["ns", "jc", "sa", "jd", "Alcobaça"]], score:[15, 7]},
		{date:"2016-10-03", players:[["am", "rp", "pv", "jc", "sa"],["rf", "ns", "jr", "jd"]], score:[13, 6]},
		{date:"2016-10-10", players:[["am", "jd", "pv", "Tiago Ferreira"],["jr", "ns", "rp", "jc"]], score:[6, 6]},
		{date:"2016-10-17", players:[["am", "jd", "rf", "rp", "sa"],["jr", "ns", "jm", "jc", "pv"]], score:[11, 4]},
		{date:"2016-10-24", players:[["am", "jr", "rf", "jm", "ns"],["rp", "rg", "sa", "jc", "pv"]], score:[8, 10]},
		{date:"2016-10-31", players:[["am", "pv", "jc", "ns"],["rp", "rf", "sa", "Alcobaça"]], score:[8, 7]},
		{date:"2016-11-07", players:[["pv", "jr", "ns", "jm"],["rp", "rf", "sa", "jc"]], score:[6, 8]},
		{date:"2016-11-14", players:[["rf", "jr", "rp", "Alcobaça"],["am", "ns", "sa", "jc"]], score:[12, 8]}
	];

	// each item: [<aliases>, <nicknames>, <short name>]
	// <aliases>: array of names to be matched
	// <nicknames>: array of nicknames to use for player (one will be picked at random)
	// <single name>: shortest version of the player's name that uniquely identifies him/her'
	var users = [
	[["am", "andre", "andré"], ["André Morujão"], "André"],
	[["cb", "barbosa"], ["Captain Barbossa"], "Barbosa"],
	[["cs", "silva"], ["Carlos Fucking Silva"], "Silva"],
	[["gs", "guilherme", "saraiva", "guilherme saraiva"], ["Guilherme Saraiva"], "Guilherme"],
	[["ja", "joana araujo"], ["Joana Araujo"], "Joana Araújo"],
	[["jd", "jose duraes"], ["José Durães"], "Durães"],
	[["jm", "joao", "joão"], ["John The Rock Macedo"], "João"],
	[["joao morais", "joão morais", "morais"], ["João Morais"], "Morais"],
	[["jb", "jorge", "batista", "baptista", "jorge batista", "jorge baptista"], ["Jorge o Mágico", "Magic Jorge XXL"], "Jorge"],
	[["jc", "jose carlos", "josé carlos", "ze carlos", "zé carlos", "medeiros"], ["José Carlos"], "Zé Carlos"],
	[["jr", "jose", "josé", "jose ribeiro", "josé ribeiro"], ["Zé Maxi Ribeiro", "Zé Payet Ribeiro"], "Zé Ribeiro"],
	[["ju", "joana", "cerejo", "joana cerejo"], ["Joana Cerejo"], "Cerejo"],
	[["ns", "nuno", "nuno sousa"], ["Nuno Sousa"], "Nuno"],
	[["pd", "paulo", "dias", "paulo dias"], ["Paulo Dias"], "Paulo"],
	[["pv", "pedro", "vieira", "pedro vieira"], ["Pedro Vieira"], "Pedro"],
	[["rg", "ricardo", "gomes", "ricardo gomes"], ["Ricardo Cheetah Gomes"], "Ricardo"],
	[["rf", "rui ferreira", "ferreira"], ["Rui Ferreira"], "Rui"],
	[["rt", "rui torres"], ["Rui Torres"], "Torres"],
	[["rp", "rui pereira", "milks"], ["Milks"], "Milks"],
	[["sa", "sergio azevedo", "sérgio azevedo", "azevedo"], ["Sérgio Azevedo"], "Sérgio"],
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

	function getRandomNickname(alias) {
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

	function getPlayerShortName(alias) {
		var aliasLowerCase = alias.toLowerCase();
        for (var i = 0; i < users.length; i++) {
            var nicks = users[i];
            var names = nicks[0];
            for (var j = 0; j < names.length; j++) {
                if (aliasLowerCase === names[j]) {
					return nicks[2];
                }
            }
        }
        return alias;
    }

	function getPlayerScore(msg, user, numberOfMatches) {
		var stats = getStats(msg, user, numberOfMatches);
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

	function sortPlayers(msg, players, randomizePartialTies, numberOfMatches) {
		players.sort(function (player1, player2) {
			var score1 = getPlayerScore(msg, player1, numberOfMatches);
			var score2 = getPlayerScore(msg, player2, numberOfMatches);
			if (randomizePartialTies) {
				score1 = Math.floor(score1);
				score2 = Math.floor(score2);
			}
			if (score1 == score2) {
				// randomize order for players with the same score
				return Math.floor((Math.random() * 3) + 1) - 2;
			}
			return score2 - score1;
		});
	}

	// team generation types explained (numbers reflect each player's position in the ranking):
	// - random: what you'd expect
	// - alternating: 1357 vs 2468
	// - alternating-pairs: 1458 vs 2367
	function teamup(msg, players, team1, team2, type, numberOfMatches, header) {

		//TODO: add type for: 2 top + 2 bottom for one team, 4 in the middle for the other team 
		if (type === "random") {
			// random sort
			shuffle(players);
		} else if (type === "ranking" || type === "alternating" || type === "alternating-pairs") {
			// sort based on ranking
			sortPlayers(msg, players, true, numberOfMatches);
		} else {
			msg.send("Unsupported teamup type: " + type);
			return;
		}

		var teams = [team1, team2];
		var team = team1.length == team2.length ? Math.floor(Math.random() * 2) :
			team1.length > team2.length ? 1 : 0;
		if (type === "alternating") {
			for (var player = 0; player < players.length; player++) {
				teams[team].push(players[player]);
				var otherTeam = (team + 1) % 2;
				if (teams[team].length >= teams[otherTeam].length) {
					team = otherTeam;
				}
			}
		} else {// random (it doesn't matter which type we use, what matters is the random sort), ranking, alternating-pairs
			for (var player = 0; player < players.length; player++) {
				teams[team].push(players[player]);
				var otherTeam = (team + 1) % 2;
				if (teams[team].length > teams[otherTeam].length) {
					team = otherTeam;
				}
			}
		}

        // replace aliases with nicknames
		for (var t = 0; t < teams.length; t++) {
			for (var p = 0; p < teams[t].length; p++) {
				teams[t][p] = getRandomNickname(teams[t][p]);
			}
		}

        // randomize team names
        var teamNames = teamPairs[Math.floor(Math.random() * teamPairs.length)];

        // display teams & players
		var lines = [];
		if ((typeof header === 'string' || header instanceof String) && header.length > 0) {
			lines.push(header);
		}
		// team images disabled
        //if (teamNames.length == 3) {// only some of the team pairs have an image to go with it (on item [2])
		//	lines.push(teamNames[2]);
        //}
        lines.push(":soccer: *" + teamNames[0] + "*: " + teams[0].join(", ") + "\n:shirt: *" + teamNames[1] + "*: " + teams[1].join(", "));
		msg.send(lines.join("\n"));
    };

	function getMatchString(msg, match) {

		var message = match.date;
		var players = [];
		for (var player = 0; player < match.players[0].length; player++) {
			players.push(getPlayerShortName(match.players[0][player]));
		}
		message += " [" + players.join(", ") + "] " + match.score[0];
		message += " - ";
		players = [];
		for (var player = 0; player < match.players[1].length; player++) {
			players.push(getPlayerShortName(match.players[1][player]));
		}
		message += match.score[1] + " [" + players.join(", ") + "]";
		return message;
	}

	function getStats(msg, user, match_count) {

		var stats = [0, 0, 0];// wins, draws, losses
		for (var m = ((match_count <= 0 || match_count > matches.length) ? 0 : (matches.length - match_count)); m < matches.length; m++) {
			var match = matches[m];
			var ownScore = -1;
			var otherScore = -1;
			if (match.players[0].indexOf(user) >= 0) {
				ownScore = match.score[0];
				otherScore = match.score[1];
			} else if (match.players[1].indexOf(user) >= 0) {
				ownScore = match.score[1];
				otherScore = match.score[0];
			}
			if (ownScore >= 0 && otherScore >= 0) {
				if (ownScore > otherScore) {
					stats[0]++;
				} else if (ownScore < otherScore) {
					stats[2]++;
				} else {
					stats[1]++;
				}
			}
		}
		return stats;
	}

	function ranking(msg, showDetails, numberOfMatches, minMatchesPlayed) {

		var players = [];
		for (i = 0; i < users.length; i++) {
			u = users[i][0][0];
			s = getStats(msg, u, numberOfMatches);
			if (s[0] + s[1] + s[2] >= minMatchesPlayed) {
				// only include players with at least minMatchesPlayed matches played
				players.push(u);
			}
		}

		// sort players according to their ranking
		sortPlayers(msg, players, false, numberOfMatches);
		var ranking = [];
		var lastScore = 999999999999;
		for (var i = 0, rank = 0; i < players.length; i++) {
			var player = players[i];
			var score = Math.floor(getPlayerScore(msg, player, numberOfMatches));
			if (score != lastScore) {
				rank = i + 1;
			}
			var rankLine = "#" + rank + " (";
			rankLine += (score > 0 ? "+" : "") + score + ") " + getPlayerShortName(player);
			if (showDetails) {
				var stats = getStats(msg, player, numberOfMatches);
				rankLine += " W:" + stats[0] + " D:" + stats[1] + " L:" + stats[2];
			}
			ranking.push(rankLine);
			lastScore = score;
		}
		if (ranking.length > 0) {
			msg.send("Ranking based on " + (numberOfMatches > matches.length ? "all" : ("the last " + numberOfMatches)) + " matches (for players with at least " + minMatchesPlayed + " matches played):\n" + ranking.join("\n"));
		} else {
			msg.send("There are currently no player statistics available.");
		}
	}

	function showStats(msg, player) {

		var players = [];
		if (player == "all") {
			for (var u = 0; u < users.length; u++) {
				players.push(users[u][0][0]);
			}
		} else {
			players.push(player);
		}
		lines = [];
		for (var p = 0; p < players.length; p++) {
			pl = players[p];
			name = getRandomNickname(pl);
			if (name == pl) {
				// these are non-Becker players, so we'll ignore them
				continue;
			}
			var stats = getStats(msg, pl, 99999);
			var played = stats[0] + stats[1] + stats[2];
			if (played > 0) {
				lines.push(getPlayerShortName(pl) + ": " + stats[0] + " wins " + stats[1] + " draws " + stats[2] + " losses");
			}
		}

		if (lines.length == 0) {
			msg.send("There are no stats available for '" + player + "'.");
		} else {

			lines.push("");

			var winningStreaks = {};
			var losingStreaks = {};
			var longestWinningStreak = 0;
			var longestWinningStreakPlayers = [];
			var longestLosingStreak = 0;
			var longestLosingStreakPlayers = [];
			for (var p = 0; p < players.length; p++) {
				winningStreaks[players[p]] = 0;
				losingStreaks[players[p]] = 0;
			}
			for (var m = 0; m < matches.length; m++) {
				var match = matches[m];
				if (match.score[0] == match.score[1]) {
					for (var t = 0; t < 2; t++) {
						for (var p = 0; p < match.players[t].length; p++) {
							var pl = match.players[t][p];
							if (players.indexOf(pl) >= 0) {
								winningStreaks[pl] = 0;
								losingStreaks[pl] = 0;
							}
						}
					}
				} else {
					var winners = match.score[0] > match.score[1] ? match.players[0] : match.players[1];
					var losers = match.score[0] < match.score[1] ? match.players[0] : match.players[1];
					for (var w = 0; w < winners.length; w++) {
						if (players.indexOf(winners[w]) >= 0) {
							winningStreaks[winners[w]]++;
							losingStreaks[winners[w]] = 0;
						}
					}
					for (var l = 0; l < losers.length; l++) {
						if (players.indexOf(losers[l]) >= 0) {
							winningStreaks[losers[l]] = 0;
							losingStreaks[losers[l]]++;
						}
					}
				}
				for (var ws in winningStreaks) {
					var wn = getPlayerShortName(ws);
					if (winningStreaks[ws] == longestWinningStreak) {
						if (longestWinningStreakPlayers.indexOf(wn) < 0) {
							longestWinningStreakPlayers.push(wn);
						}
					} else if (winningStreaks[ws] > longestWinningStreak) {
						longestWinningStreak = winningStreaks[ws];
						longestWinningStreakPlayers = [wn];
					}
				}
				for (var ls in losingStreaks) {
					var ln = getPlayerShortName(ls);
					if (losingStreaks[ls] == longestLosingStreak) {
						if (longestLosingStreakPlayers.indexOf(ln) < 0) {
							longestLosingStreakPlayers.push(ln);
						}
					} else if (losingStreaks[ls] > longestLosingStreak) {
						longestLosingStreak = losingStreaks[ls];
						longestLosingStreakPlayers = [ln];
					}
				}
			}
			if (longestWinningStreak > 0 && longestWinningStreakPlayers.length > 0) {
				lines.push("Longest winning streak: " + longestWinningStreak + " matches by: " + longestWinningStreakPlayers.join(", "));
			}
			if (longestLosingStreak > 0 && longestLosingStreakPlayers.length > 0) {
				lines.push("Longest losing streak: " + longestLosingStreak + " matches by: " + longestLosingStreakPlayers.join(", "));
			}

			msg.send(lines.join("\n"));
		}
	}

    robot.respond(/teamup (.+)/i, function(msg) {
      var players = msg.match[1].split(/\s?,\s?/);
      teamup(msg, players, [], [], "alternating-pairs", 9999, "*Option 1* (standard team-up strategy):");
      teamup(msg, players, [], [], "alternating", 9999, "*Option 2* (slightly modified from the standard strategy):");
      teamup(msg, players, [], [], "alternating", 10, "*Option 3* (based on recent results):");
      //teamup(msg, players, [], [], "random", 9999, "Random:");
    });

    robot.respond(/futsal teamup players=(.+) team1=(.+) team2=(.+) type=(.+) ranking-history=(\d+)/i, function(msg) {
      var players = msg.match[1].split(/\s?,\s?/);
      var team1 = msg.match[2].split(/\s?,\s?/); if (team1.length == 1 && team1[0] == '-') team1 = [];
      var team2 = msg.match[3].split(/\s?,\s?/); if (team2.length == 1 && team2[0] == '-') team2 = [];
      var type = msg.match[4];
      var history = msg.match[5];
      teamup(msg, players, team1, team2, type, history);
    });

	robot.respond(/futsal matches/i, function(msg) {

		var lines = [];
		for (var m = 0; m < matches.length; m++) {
			lines.push(getMatchString(msg, matches[m]));
		}
		msg.send(lines.join("\n"));
	});

	robot.respond(/futsal last match/i, function(msg) {
		msg.send(getMatchString(msg, matches[matches.length - 1]));
	});

	robot.respond(/futsal rank( detailed)?$/i, function(msg) {
		ranking(msg, msg.match.length >= 2 && msg.match[1] === " detailed", 9999, 2);
	});

	robot.respond(/futsal rank all(( )?time)?/i, function(msg) {
		ranking(msg, false, 9999, 2);
	});

	robot.respond(/futsal rank last (\d+)( detailed)?$/i, function(msg) {
		var matchCount = parseInt(msg.match[1]);
		if (matchCount <= 0) {
			msg.send("Please enter a positive integer for the match count.");
		} else {
			ranking(msg, msg.match.length >= 3 && msg.match[2] === " detailed", matchCount, matchCount >= 2 ? 2 : 1);
		}
	});

	robot.respond(/futsal stats (.+)/i, function(msg) {
		showStats(msg, msg.match[1]);
	});

	robot.respond(/futsal stats$/i, function(msg) {
		showStats(msg, "all");
	});
};
