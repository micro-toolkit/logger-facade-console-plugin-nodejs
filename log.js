var _ = require('lodash'),
    format = require('./format'),
    isLevelActive = require('./level');

function log(config, activeLevel, level, args){

  if (isLevelActive(level, activeLevel)) {
    args = _.toArray(args);

    var logger = args.shift();
    var msg = args.shift();

    var output = format.text(config, logger, level, msg);

    args.unshift(output);

    console.log.apply(console, args);
  }

}

module.exports = log;
