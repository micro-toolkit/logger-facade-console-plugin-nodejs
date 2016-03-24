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

function text(messageFormat, data, shouldPretify){
  var formatedMessage = messageFormat
    .replace('%logger', data.logger)
    .replace('%time',   data.timestamp)
    .replace('%level',  data.level)
    .replace('%pid',    data.pid)
    .replace('%msg',    data.message)
    .replace('%metadata', JSON.stringify(data.metadata, null, shouldPretify));

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

    var logText = '';
    if (config.json) {
      logText = JSON.stringify(data, null, pretify(config.prettyPrint));
    } else {
      logText = text(config.messageFormat, data, pretify(config.prettyPrint))
    }
    console.log(logText);
  }

}

module.exports = log;
