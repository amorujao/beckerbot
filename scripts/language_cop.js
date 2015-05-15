// Description:
//   portuguese language cop
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
    'shh, pessoal, então?',
    'pessoal, olhem lá a linguagem...',
    '#user#, olha lá a linguagem...',
    '#user#, então?',
    '#user#, vamos tentar manter o nível'
  ];

  robot.hear(/\bcaralh|\bmerda|\bfoda|\bputa/i, function(msg){
    msg.send(msg.random(phrases).replace("#user#", msg.message.user.real_name != undefined ? msg.message.user.real_name : msg.message.user.name));
  });
};
