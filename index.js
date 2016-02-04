var _ = require('lodash'),
    moment = require('moment'),
    isLevelActive = require('./level'),
    getConfig = require('./config'),
    format = require('./format');

var LoggerConsolePlugin = function(configuration) {
  var config = getConfig(configuration);

  var log = function(level, args){

    if (isLevelActive(level, this.level)) {
      args = _.toArray(args);

      var logger = args.shift();
      var msg = args.shift();

      var output = format.text(this.config, logger, level, msg);

      args.unshift(output);

      console.log.apply(console, args);
    }

  }.bind(this);

  this.config = config;

  this.level = config.level;

  this.name = 'LoggerConsolePlugin';

  this.isDebug = function(){
    return isLevelActive('debug', this.level);
  }.bind(this);

  this.debug = function(){
    log('debug', arguments);
  }.bind(this);

  this.trace = function(){
    log('trace', arguments);
  }.bind(this);

  this.info = function(){
    log('info', arguments);
  }.bind(this);

  this.warn = function(){
    log('warn', arguments);
  }.bind(this);

  this.error = function(){
    log('error', arguments);
  }.bind(this);
};

module.exports = LoggerConsolePlugin;
