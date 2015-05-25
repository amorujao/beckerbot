// Description:
//   catch phrases from JB
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot quote - Displays a random quote from someone at Becker
//

module.exports = function(robot) {

  // jbaptistada
  var jb = [
    'Share, anyone?',
    'Smack The Pit!',
    'A resposta é não.',
    'Estás um bocado _lumberjack_ #user#',
    'Agora todos...',
    'Dá cá um abraço, #user#',
    '#user#, já não me amas :(',
    'Tu não me fales assim, #user#!',
    'Aquele abraço, forte e sentido',
    'Something you gotta understand #user#: I don\'t care about you, and I sure don\'t care about your family.',
    '#user# I have two words for you, and the second one is "you"',
    'Oh my goodness dot com!'
  ];

  // csilvada
  var cs = [
    'Fuckanizer!'
  ];

  // rgomesada
  var rg = [
    'Isso é piroca'
  ];

  function sendMessage(msg, options, odds) {
    if (filterChannel(msg)) {
      return;
    }
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
    return msg.message.user.room == "general";
  }

  robot.respond(/\bquote|hit( me)?\b/i, function(msg) {
    var all = jb.concat(rg, cs);
    sendMessage(msg, all);
  });

  robot.hear(/jbaptistada/i, function(msg) {
    sendMessage(msg, jb);
  });

  robot.hear(/rgomesada/i, function(msg) {
    sendMessage(msg, rg);
  });

  robot.hear(/csilvada/i, function(msg) {
    sendMessage(msg, cs);
  });

  robot.hear(/peço desculpa/i, function(msg) {
    sendMessage(msg, ["não, eu é que peço desculpa"]);
  });

  robot.hear(/\bobrigado|agrade(c|ç)o\b/i, function(msg) {
    sendMessage(msg, ["não, eu é que agradeço"]);
  });

  robot.hear(/\b(pit(t?)|smack)\b/i, function(msg) {
    sendMessage(msg, ["Smack the Pit!!"]);
  });

  robot.hear(/\bjavascript\b/i, function(msg) {
    sendMessage(msg, ["en-_habascript_"]);
  });
};
