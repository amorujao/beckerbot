// Description:
//   Random bits of fun @ Becker
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
    'Como é que é, smack?',
    'A resposta é não.',
    'Estás um bocado _lumberjack_ #user#',
    'Agora todos...',
    '#user#, já não me amas :(',
    'Tu não me fales assim, #user#!',
    'Something you gotta understand #user#: I don\'t care about you, and I sure don\'t care about your family.',
    '#user# I have two words for you, and the second one is "you"'
  ];

  // csilvada
  var cs = [
    'Fuckanizer!',
    'Está como o aço'
  ];

  // rgomesada
  var rg = [
    'Isso é piroca',
    'Isso é raça piroca',
    'Na ponta da piroca!'
  ];

  // phrases used by more than one person
  var misc = [
    'Há aqui um galhenz',
    '#user# aquele abraço',
    'Dá cá um abraço, #user#',
    'Aquele abraço, forte e sentido',
    'Oh my goodness dot com!'
  ];

  var lulz = [
    'lol',
    'lolol',
    'lmao',
    'rotfl',
    ':D',
    'http://media.giphy.com/media/reJOGQ43nNeGk/giphy.gif',
    'https://www.youtube.com/watch?v=oShTJ90fC34',
    'http://campusheathq.com/wp-content/uploads/2014/03/LMAO.png'
  ];

  var kungfury = [
    "*Kung Fury:* _You don't need that spine._ \n[Grabs Nazi soldier by the head and rips out his spine]\n*Kung Fury:* _It's holding you back._",
    "*Kung Fury:* _I'm disarming you._ [rips Nazi soldier's arm off]",
    "*Hacker Man:* _Wait a minute. Using an RX modulator, I might be able to conduct a mainframe cell layer and hack you into the download._ \n*Kung Fury:* _What the hell does that mean?_ \n*Hacker Man:* _It means that with the right computer algorithms, I can hack you back in time. Just like a time machine._",
    "*Kung Fury:* _Fuck! That's a laser raptor. I thought they went extinct thousands of years ago._",
    "*Private Lahmstache:* _Where did the tank go?_ \n[Kung Fury holds the tank upward from the barrel and squashes the two Nazi soldiers with it]\n*Kung Fury:* _Tank you._",
    "*Thor:* _Behold - it is me, Thor. Son of Odin and protector of mankind. Check out my pecs._",
    "*Kung Fury:* _Knock knock!_ \n*Red Ninja:* _Who's there?_ \n*Kung Fury:* _Knu...ckles._"
  ];

  function filterChannel(msg) {
    return msg.message.user.room == "general";
  }

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

  robot.respond(/\bquote|hit( me)?\b/i, function(msg) {
    var all = misc.concat(jb, rg, cs);
    sendMessage(msg, all);
  });

  robot.hear(/jbaptistada/i, function(msg) {
    sendMessage(msg, jb);
  });
  
  robot.hear(/jbatistada/i, function(msg) {
    sendMessage(msg, ["#user# aprende a escrever"]);
  });

  robot.hear(/rgomesada/i, function(msg) {
    sendMessage(msg, rg);
  });

  robot.hear(/csilvada/i, function(msg) {
    sendMessage(msg, cs);
  });

  robot.hear(/\bpeço desculpa\b/i, function(msg) {
    sendMessage(msg, ["não, eu é que peço desculpa"]);
  });

  robot.hear(/\bobrigado|agrade(c|ç)o\b/i, function(msg) {
    sendMessage(msg, ["não, eu é que agradeço"]);
  });

  robot.hear(/\bd(a|á) c(a|á) um abra(ç|c)o$\b/i, function(msg) {
    // TODO: add alternative of looking up "bro hug" or similar on Google Images and posting the URL
    sendMessage(msg, ["forte e sentido"]);
  });

  robot.hear(/\b(smack|pit(t?))\b/i, function(msg) {
    sendMessage(msg, ["Smack the Pit!!"]);
  });

  robot.hear(/\bjavascript\b/i, function(msg) {
    sendMessage(msg, ["en-_habascript_"]);
  });

  robot.hear(/\blo(l|o)+|lmao|rotfl(o|l)+\b/i, function(msg) {

    var now = new Date().getTime();
    var room = msg.message.room;
    var user = msg.message.user.name;

    var last_lol_time = msg.robot.brain.get("last_lol_time");
    var last_lol_room = msg.robot.brain.get("last_lol_room");
    var last_lol_user = msg.robot.brain.get("last_lol_user");

    msg.robot.brain.set("last_lol_time", now);
    msg.robot.brain.set("last_lol_room", room);
    msg.robot.brain.set("last_lol_user", user);

    var silent = msg.robot.brain.get("no_lol_until");

    if (silent != undefined && now < silent) {
      return;
    }

    // reply if the last lol happened in the same room, in the last 20 seconds, and it was said by a different user
    if (last_lol_time != undefined &&
        (now - last_lol_time) < 20000 &&
        last_lol_room == room &&
        last_lol_user != user) {

      sendMessage(msg, lulz);

      // don't lol again in the next 30 seconds
      msg.robot.brain.set("no_lol_until", now + 30000);
    }
  });

  robot.respond(/\b(kung|fury)+\b/i, function(msg) {
    sendMessage(msg, kungfury);
  });
};
