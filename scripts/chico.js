// Description:
//   Random comments on user's check-ins / check-outs
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
  var in_late = [
    'boa tarde',
    'anything to declare?'
  ];
  var in_normal = [
    'bom dia',
    'boas',
    'olá',
    ':wave:'//,
    //'#user# e vir para o escritório, não?'
  ];
  var out_early = [
    'vais tirar a tarde?',
    'anything to declare?',
    'pq?',
    'bebe mais um copo'
  ];
  var out_normal = [
    'espera, preciso de falar contigo...',
    'bebe mais um copo',
    '#user# precisava de falar contigo',
    ':wave:'
  ];
  var poker = ['call', 'fold'];

  function sendMessage(msg, options, odds) {
    if (typeof odds === 'undefined') {
      odds = 1;
    }
    if (Math.random() <= odds) {
      message = msg.random(options).replace("#user#", msg.message.user.real_name != undefined ? msg.message.user.real_name : msg.message.user.name);
      msg.send(message);
    }
  }

  function filterChannel(msg) {
    return msg.message.user.room != "chico" && msg.message.user.room != "hubot" && msg.message.user.room != 'andre-tests' && msg.message.user.room != 'Shell';
  }

  robot.hear(/\bin\b/i, function(msg){
    if (filterChannel(msg)) {
      return;
    }

    var now = new Date();//new Date().toLocaleString("en-US", {timeZone: "Europe/Lisbon"}));
    var hours = now.getHours();
    var minutes = now.getMinutes();

    if (msg.message.text.search(/doente|sick|medico|médico|doctor/i) >= 0) {
      sendMessage(msg, ["Um Jack Daniels resolve isso"]);
    } else if (msg.message.text.search(/\ball in\b/i) >= 0) {
      sendMessage(msg, poker);
    } else if (hours >= 9 && hours < 11) {
      sendMessage(msg, in_late, 1);
    } else if (hours < 9) {
      sendMessage(msg, in_normal, 0.2);
    }
  });

  robot.hear(/\bout\b/i, function(msg) {
    if (filterChannel(msg)) {
      return;
    }

    var now = new Date();//new Date().toLocaleString("en-US", {timeZone: "Europe/Lisbon"}));
    var hours = now.getHours();
    var minutes = now.getMinutes();

    if (msg.message.text.search(/doente|sick|medico|médico|doctor/i) >= 0) {
      sendMessage(msg, ["Um Jack Daniels resolve isso"]);
    } else if (hours >= 15 && hours < 17) {
      sendMessage(msg, out_early, 1);
    } else if (hours >= 17) {
      sendMessage(msg, out_normal, 0.25);
    }
  });

  robot.hear(/i.?ll be back/i, function(msg) {
    if (filterChannel(msg)) {
      return;
    }

    sendMessage(msg, ["http://media.giphy.com/media/JDKxRN0Bvmm2c/giphy.gif", "http://www.reactiongifs.us/wp-content/uploads/2013/06/ill_be_back_terminator.gif"]);
  });
};
