var _ = require('lodash');

var defaults = {
  level: 'debug',
  timeFormat: 'YYYY-MM-DD HH:mm:ss',
  messageFormat: '%time | %logger::%level | PID: %pid - %msg'
};

function getConfig(configuration){
  return _.defaults({}, configuration, defaults);
}

module.exports = getConfig;
