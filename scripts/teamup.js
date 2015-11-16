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

    var nicknames = [
	[["am", "andre", "andré"], ["André"]],
	[["cb", "barbosa"], ["Barbossa"]],
	[["cs", "silva"], ["Carlos Fucking Silva"]],
	[["jm", "joao", "joão"], ["John The Rock Macedo"]],
	[["joao morais", "joão morais", "morais"], ["João Morais"]],
	[["jb", "jorge", "batista", "baptista", "jorge batista", "jorge baptista"], ["Jorge o Mágico", "Magic Jorge XXL"]],
	[["jc", "jose carlos", "josé carlos", "ze carlos", "zé carlos", "medeiros"], ["Zé Carlos"]],
	[["jr", "jose", "josé", "jose ribeiro", "josé ribeiro"], ["Zé Maxi Ribeiro"]],
	[["ns", "nuno"], ["Nuno"]],
	[["pd", "paulo", "dias", "paulo dias"], ["Paulo"]],
	[["pp", "pinho", "paulo pinho"], ["Paulo Pinho"]],
	[["rg", "ricardo", "gomes", "ricardo gomes"], ["Ricardo Cheetah Gomes"]],
	[["rf", "rui"], ["Rui"]],
	[["sergio", "sérgio"], ["Sérgio"]],
	[["sa", "sergio azevedo", "sérgio azevedo", "azevedo"], ["Sérgio Azevedo"]],
	[["sd", "sergio dias", "sérgio dias"], ["Sérgio El Gato Dias"]],
	[["vt", "vasco"], ["Vasco"]],
    ];

    function shuffle(arr){
        for(var j, x, i = arr.length; i; j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    };

    function teamup(msg, players, rivals) {

        //TODO: add support for rivals
        if (rivals.length > 0) {
            msg.send("Sorry, rival support is not implemented yet.");
            return;
        }

        shuffle(players);

        for (var i = 0; i < players.length; i++) {
            var name = players[i].toLowerCase();
            for (var j = 0; j < nicknames.length && name != ""; j++) {
                var nicks = nicknames[j];
                var names = nicks[0];
                for (var k = 0; k < names.length; k++) {
                    if (name === names[k]) {
                        nicks = nicks[1];
                        var nick = nicks[Math.floor(Math.random() * nicks.length)];
                        players[i] = nick.replace("$name", players[i]);
                        name = "";
                        break;
                    }
                }
            }
        }

        var midPoint = Math.floor(players.length / 2);
        var team1 = [];
        var team2 = [];
        for(var i = 0; i < players.length; i++){
            // TODO: only pick captains from Becker's names, not from outsiders
            if (i < midPoint) {
                team1.push(i == 0 ? (":crown:*" + players[i] + "*") : players[i]);
            } else {
                team2.push(i == midPoint ? (":crown:*" + players[i] + "*") : players[i]);
            }
        }

        var teamNames = teamPairs[Math.floor(Math.random() * teamPairs.length)];

        if (teamNames.length == 3) {
            msg.send(teamNames[2]);
        }
        msg.send(":soccer: *" + teamNames[0] + "*: " + team1.join(", ") + "\n:shirt: *" + teamNames[1] + "*: " + team2.join(", "));
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

};
