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
    'alguma coisa a declarar?',
    'pq?',
    '#user# bebe mais um copo'
  ];
  var out_normal = [
    '#user# espera, preciso de falar contigo...',
    'bebe mais um copo',
    '#user# precisava de falar contigo...',
    ':wave:',
    'forte abraço'
  ];
  var out_lunch = [
    'bom almoço',
    'onde vais?',
    'há espaço para mais um?',
    'também posso ir?',
    'até já'
  ];
  var poker = ['call', 'fold'];
  var jd = [
    'http://www.jackdaniels.com/sites/default/files/MD1_small.png',
    'Um Jack Daniels resolve isso'
  ];
  var timezoneOffset = 1;

  function sendMessage(msg, options, odds) {
    if (typeof odds === 'undefined') {
      odds = 1;
    }
    if (Math.random() <= odds) {
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
    return msg.message.user.room != "chico" && msg.message.user.room != "hubot" && msg.message.user.room != 'andre-tests' && msg.message.user.room != 'Shell';
  }

  robot.hear(/i.?ll be back/i, function(msg) {
    if (filterChannel(msg)) {
      return;
    }

    sendMessage(msg, ["http://media.giphy.com/media/JDKxRN0Bvmm2c/giphy.gif", "http://www.reactiongifs.us/wp-content/uploads/2013/06/ill_be_back_terminator.gif"]);
  });

  robot.hear(/^((?!i.?ll).)*be back in/i, function(msg) {
    if (filterChannel(msg)) {
      return;
    }
    sendMessage(msg, ["http://www.quickmeme.com/img/04/0429078be3870a05c54ecae0b10ddd5afb749b3e5f5ee9f4382af36601766960.jpg"], 0.2);
  });

  robot.hear(/\b(in|out)\b/i, function(msg) {

    if (filterChannel(msg)) {
      return;
    }

    var text = msg.message.text;
    var _in = text.search(/\bin\b/i) >= 0;
    var _out = text.search(/\bout\b/i) >= 0;

    // not sure what to make of this, so we'll just ignore it
    if (_in == _out) {
	return;
    }

    if (text.search(/doente|sick|medico|médico|doctor/i) >= 0) {
      sendMessage(msg, jd, 0.3333);
      return;
    } else if (text.search(/\ball in\b/i) >= 0) {
      sendMessage(msg, ["http://www.pokerdictionary.net/wp-content/uploads/2013/01/poker_face.png"]);
      setTimeout(function(){ sendMessage(msg, poker); }, 4000);
      return;
    }

    var now = new Date();
    var weekDay = now.getDay();

    // if weekend, return
    if (weekDay < 1 || weekDay > 5) {
      return;
    }

    var hours = now.getHours() + timezoneOffset;
    var explanation = text.trim().length > 3;

    switch(hours) {
      case 7:
      case 8:
      case 9:
        if (_in) {
          sendMessage(msg, in_normal, 0.2);
        }
        break;
      case 10:
      case 11:
        if (_in && !explanation) {
          sendMessage(msg, in_late, 1);
        }
        break;
      case 12:
      case 13:
      case 14:
        if (_out && text.search(/lunch|almoc|almoç/i) >= 0) {
          sendMessage(msg, out_lunch, 0.5);
        }
        break;
      case 15:
      case 16:
      case 17:
        if (_out) {
          if (explanation) {
            sendMessage(msg, out_normal, 0.25);
          } else {
          sendMessage(msg, out_early, 1);
        }
        }
        break;
      case 18:
      case 19:
      case 20:
        if (_out) {
          sendMessage(msg, out_normal, 0.25);
        }
        break;
      default:
        break;
    }
  });
};
