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
//   hubot jbaptistada

module.exports = function(robot) {
  //user placeholder: "#user#"
  var phrases = [
    'share, anyone?',
    'não, eu é que agradeço',
    '#user#, faz uma coisa...',
    'Smack The Pit!',
    'a resposta é não.',
    'estás um bocado lumberjack, #user#',
    'agora todos...',
    'dá cá um abraço, #user#',
    '#user#, já não me amas :(',
    'tu não me fales assim, #user#!',
    'aquele abraço, forte e sentido'
  ];

  robot.hear(/jbaptistada/i, function(msg){
    msg.send(msg.random(phrases).replace("#user#", msg.message.user));
  });
};
