// Description:
//   Debug helper script
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

  robot.respond(/debug/i, function(msg) {
    if (msg.message.user.room != "hubot" &&
        msg.message.user.room != "andre-tests") {
      return;
    }

    console.log(msg);
    msg.send(new Date());
    msg.send(new Date().toLocaleString("en-US", {timeZone: "Europe/Lisbon"}));
    msg.send(new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/Lisbon"})));
    msg.send(JSON.stringify(msg.message));
    msg.send(JSON.stringify(msg.match));
    msg.send(JSON.stringify(msg.envelope));
  });
};
