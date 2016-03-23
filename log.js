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
    .replace('%msg',    data.message)
    .replace('%metadata', JSON.stringify(data.metadata));

  return formatedMessage;
}

function pretify(shouldPretify) {
  if (shouldPretify) {
    return 2;
  }
  return null;
}

function log(config, activeLevel, level, args){

  if (isLevelActive(level, activeLevel)) {
    args = _.toArray(args);

    var logger = args.shift();
    var metadata = args.shift();
    var msg = args.shift();

    var message = null;
    if (msg) {
      args.unshift(output(msg));
      message = util.format.apply(null, args);
    }

    var data = {
      timestamp:  timestamp(config.timeFormat),
      logger:     logger.toUpperCase(),
      level:      level.toUpperCase(),
      pid:        process.pid,
      metadata:   metadata,
      message:    message
    };
    
    var logText = config.json ? JSON.stringify(data, null, pretify(config.prettyPrint))
      : text(config.messageFormat, data);
    console.log(logText);
  }

}

module.exports = log;
