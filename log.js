var _ = require('lodash'),
    moment = require('moment'),
    util = require('util'),
    isLevelActive = require('./level');

function timestamp(timeFormat){
  return moment.utc().format(timeFormat);
}

function output(msg){
  return msg instanceof Error ? msg.stack : msg;
}

function text(messageFormat, data){
  var formatedMessage = messageFormat
    .replace('%logger', data.logger)
    .replace('%time',   data.timestamp)
    .replace('%level',  data.level)
    .replace('%pid',    data.pid)
    .replace('%msg',    data.message);

  return formatedMessage;
}

function log(config, activeLevel, level, args){

  if (isLevelActive(level, activeLevel)) {
    args = _.toArray(args);

    var logger = args.shift();
    var msg = args.shift();

    args.unshift(output(msg));
    var message = util.format.apply(null, args);

    // TODO: #xx hack
    var pid = parseInt('%pid'.replace('%pid', process.pid), 10);
    var data = {
      timestamp:  timestamp(config.timeFormat),
      logger:     logger.toUpperCase(),
      level:      level.toUpperCase(),
      pid:        pid,
      message:    message
    };

    var logText = config.json ? JSON.stringify(data)
      : text(config.messageFormat, data);
    console.log(logText);
  }

}

module.exports = log;
