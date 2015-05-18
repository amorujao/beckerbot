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
//   None

module.exports = function(robot) {
  //user placeholder: "#user#"
  var phrases = [
    'Share, anyone?',
    'Smack The Pit!',
    'A resposta é não.',
    'estás um bocado lumberjack, #user#',
    'agora todos...',
    'dá cá um abraço, #user#',
    '#user#, já não me amas :(',
    'tu não me fales assim, #user#!',
    'aquele abraço, forte e sentido',
    'Something you gotta understand #user#: I don\'t care about you, and I sure don\'t care about your family.',
    '#user# I have two words for you, and the second one is "you"'
  ];

  function messageAllowed(msg) {
    return msg.message.user.room != "general";
  }

  robot.hear(/jbaptistada/i, function(msg) {
    if (messageAllowed(msg)) {
      msg.send(msg.random(phrases).replace("#user#", msg.message.user.real_name != undefined ? msg.message.user.real_name : msg.message.user.name));
    }
  });

  robot.hear(/peço desculpa/i, function(msg) {
    if (messageAllowed(msg)) {
      msg.send("não, eu é que peço desculpa");
    }
  });

  robot.hear(/obrigado/i, function(msg) {
    if (messageAllowed(msg)) {
      msg.send("não, eu é que agradeço");
    }
  });

  robot.hear(/\bpit(t?)\b/i, function(msg) {
    if (messageAllowed(msg)) {
      msg.send("Smack The Pit!!");
    }
  });

  robot.hear(/\bjavascript\b/i, function(msg) {
    if (messageAllowed(msg)) {
      msg.send("en-_habascript_");
    }
  });
};
