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

        if (teamNames.length == 3) {
            msg.send(teamNames[2]);
        }
        msg.send(teamNames[0] + ": " + team1.join(", ") + "\n" + teamNames[1] + ": " + team2.join(", "));
    });
};
