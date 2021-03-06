[![Build Status](https://travis-ci.org/micro-toolkit/logger-facade-console-plugin-nodejs.svg?branch=master)](https://travis-ci.org/micro-toolkit/logger-facade-console-plugin-nodejs)
[![Code Climate](https://codeclimate.com/github/micro-toolkit/logger-facade-console-plugin-nodejs.png)](https://codeclimate.com/github/micro-toolkit/logger-facade-console-plugin-nodejs)
[![Coverage](http://img.shields.io/codeclimate/coverage/github/micro-toolkit/logger-facade-console-plugin-nodejs.svg)](https://codeclimate.com/github/micro-toolkit/logger-facade-console-plugin-nodejs)
[![Dependency Status](https://gemnasium.com/micro-toolkit/logger-facade-console-plugin-nodejs.svg)](https://gemnasium.com/micro-toolkit/logger-facade-console-plugin-nodejs)
![Grunt](https://cdn.gruntjs.com/builtwith.png)

# Logger Facade Console plugin for Nodejs

Simple node module to log information on console using logger facade.

This simple logger facade allows pluggin hook to execute different logging.

The plugin receives a config file with:

**Level:** The level configuration active for this pluggin.

**Time Format:** The time format using [moment.js](momentjs.com) formats.

**Message Format:** The message format to log, the message information can use util.format parameters.
 * %logger - name of current logger instance
 * %time - current date time
 * %level - message level
 * %pid - process id
 * %msg - message to log
 * %metadata - additional metadata to log

# How to use it

Install it:

```
npm install logger-facade-nodejs
npm install logger-facade-console-plugin-nodejs
```

## Set up plugins and log in a human readable format

If you use metadata, to improve readability you may want to use `prettyPrint: true`.

```javascript
var Logger = require('logger-facade-nodejs');
var LoggerConsolePlugin = require('logger-facade-console-plugin-nodejs');

// this is the default config
var config = {
  level: 'debug',
  timeFormat: 'YYYY-MM-DD HH:mm:ss',
  messageFormat: '%time | %logger::%level - %msg',
  json: false,
  prettyPrint: false
};

console.log("Start sample of Async Log...");

var plugin = new LoggerConsolePlugin(config);
Logger.use(plugin);

console.log("Plugins: ", Logger.plugins());

var log = Logger.getLogger("Name");
log.trace("Message to log %s and should be hidden due to log level", 'with args');
log.trace({someinfo: true}, "Message to log %s and should be hidden due to log level", 'with args');
log.debug("Message to log %s", 'with args');
log.debug({someinfo: true}, "Message to log %s", 'with args');
log.info("Message to log %s", 'with args');
log.info({someinfo: true}, "Message to log %s", 'with args');
log.warn("Message to log %s", 'with args');
log.warn({someinfo: true}, "Message to log %s", 'with args');
log.error("Message to log %s", 'with args');
log.error({someinfo: true}, "Message to log %s", 'with args');

console.log("End sample... Yes, you see this first because the log write is set to next process instruction. :D");

process.nextTick(function(){
  console.log("Start sample of Async Log and delay execution...");
  log.info("Message to log %s", 'with args');
  process.nextTick(function(){
    console.log("End sample of delayed execution!");
  });
});
```
Download the code from this [gist](https://gist.github.com/pjanuario/c5889fc5f9160fab0d0b).

# Set up plugins and log in a json format

```javascript
var Logger = require('logger-facade-nodejs');
var LoggerConsolePlugin = require('logger-facade-console-plugin-nodejs');

// this is the default config
var config = {
  level: 'debug',
  timeFormat: 'YYYY-MM-DD HH:mm:ss',
  messageFormat: '%time | %logger::%level - %msg',
  json: true,
  prettyPrint: false
};

console.log("Start sample of Async Log IN JSON...");

var plugin = new LoggerConsolePlugin(config);
Logger.use(plugin);

console.log("Plugins: ", Logger.plugins());

var log = Logger.getLogger("Name");
log.trace("Message to log %s and should be hidden due to log level", 'with args');
log.debug("Message to log %s", 'with args');
log.info("Message to log %s", 'with args');
log.warn("Message to log %s", 'with args');
log.error("Message to log %s", 'with args');

console.log("End sample... Yes, you see this first because the log write is set to next process instruction. :D");

process.nextTick(function(){
  console.log("Start sample of Async Log and delay execution...");
  log.info("Message to log %s", 'with args');
  process.nextTick(function(){
    console.log("End sample of delayed execution!");
  });
});
```

## Pretty print option

The pretty print option is used to ouput metadata in a json pretty print format.

Download the code from this [gist](https://gist.github.com/pjanuario/238a8b0819cf390779f2).

# Contributing
Bug fixes and new features are of course very welcome!

To get started developing:
 - Install [Grunt](http://gruntjs.com/)
 - Install dependencies with ```npm install```
 - Run the test suite with ```npm test```

Please accompany any Pull Requests with the relevant test cases and make sure everything else still passes :).

# Credits
Shout out to @pjanuario.
