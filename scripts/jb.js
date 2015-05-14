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

  var phrases = [
    'share anyone?',
    'não, eu é que agradeço',
    'faz uma coisa...',
    'Smack The Pt!',
    'a resposta é não.',
    'estás um bocado lumberjack',
    'agora todos...',
    'dá cá um abraço',
    'já não me amas :('
  ];

  robot.hear(/jbaptistada/i, function(msg){
    msg.send(msg.random(phrases));
  });
};
