var levels = {
  trace: 0,
  debug: 1,
  info:  2,
  warn:  3,
  error: 4
};

function isLevelActive(logLevel, currentLevel){
  var activeLevel = levels[currentLevel.toLowerCase()];
  var level = levels[logLevel];
  return activeLevel <= level;
}

module.exports = isLevelActive
