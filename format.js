var moment = require('moment');

function text(config, logger, level, msg){
  var now = moment.utc().format(config.timeFormat);

  var outputMsg = msg instanceof Error ? msg.stack : msg;

  var formatedMessage = config.messageFormat
    .replace('%logger', logger.toUpperCase())
    .replace('%time', now)
    .replace('%level', level.toUpperCase())
    .replace('%pid', process.pid)
    .replace('%msg', outputMsg);

  return formatedMessage;
}

module.exports = {
  text: text
};
