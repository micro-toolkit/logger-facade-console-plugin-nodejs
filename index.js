var isLevelActive = require('./level'),
    getConfig = require('./config'),
    log = require('./log');

var LoggerConsolePlugin = function(configuration) {
  var config = getConfig(configuration);

  this.config = config;

  this.level = config.level;

  this.name = 'LoggerConsolePlugin';

  this.isDebug = function(){
    return isLevelActive('debug', this.level);
  }.bind(this);

  this.debug = function(){
    log(this.config, this.level, 'debug', arguments);
  }.bind(this);

  this.trace = function(){
    log(this.config, this.level, 'trace', arguments);
  }.bind(this);

  this.info = function(){
    log(this.config, this.level, 'info', arguments);
  }.bind(this);

  this.warn = function(){
    log(this.config, this.level, 'warn', arguments);
  }.bind(this);

  this.error = function(){
    log(this.config, this.level, 'error', arguments);
  }.bind(this);
};

module.exports = LoggerConsolePlugin;
