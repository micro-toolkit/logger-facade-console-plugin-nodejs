[![Build Status](https://travis-ci.org/pjanuario/logger-facade-console-plugin-nodejs.svg?branch=master)](https://travis-ci.org/pjanuario/logger-facade-console-plugin-nodejs)
[![Code Climate](https://codeclimate.com/github/pjanuario/logger-facade-console-plugin-nodejs.png)](https://codeclimate.com/github/pjanuario/logger-facade-console-plugin-nodejs)
[![Coverage](http://img.shields.io/codeclimate/coverage/github/pjanuario/logger-facade-console-plugin-nodejs.svg)](https://codeclimate.com/github/pjanuario/logger-facade-console-plugin-nodejs)
[![Dependency Status](https://gemnasium.com/pjanuario/logger-facade-console-plugin-nodejs.svg)](https://gemnasium.com/pjanuario/logger-facade-console-plugin-nodejs)
![Grunt](https://cdn.gruntjs.com/builtwith.png)

# Logger Facade Console plugin for Nodejs

Simple node module to log information on console using logger facade.

This simple logger facade allows pluggin hook to execute different logging.

The plugin receives a config file with:

**Level:** The level configuration active for this pluggin.

**Format:** The message format to log, the message information can use util.format parameters.
 * %name - name of current logger instance
 * %time - current date time
 * %level - message level
 * %pid - process id
 * %msg - message

# How to use it

Install it:

```
npm install logger-facade-console-plugin-nodejs
```

Set up plugins and log

```javascript
var Logger = require('logger-facade-nodejs');
var LoggerConsolePlugin = require('logger-facade-console-plugin-nodejs');

var config = {
  format: '%time | %name::%level | PID: %pid - %msg',
  level: 'debug'
};
var plugin = new LoggerConsolePlugin(config);
Logger.use(plugin);

var log = new Logger("Name");
log.debug("message to log %s", 'with args');
```

# Contributing
Bug fixes and new features are of course very welcome!

To get started developing:
 - Install [Grunt](http://gruntjs.com/)
 - Install dependencies with ```npm install```
 - Run the test suite with ```npm test```

Please accompany any Pull Requests with the relevant test cases and make sure everything else still passes :).

# Credits
Shout out to @pjanuario.
