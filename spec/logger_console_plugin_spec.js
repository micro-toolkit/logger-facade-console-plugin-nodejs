describe('Logger Console Plugin', function(){

  var LoggerConsolePlugin = require('../index'),
      util = require('util');

  var plugin, defaultMessage, defaultData;

  beforeEach(function(){
    plugin = new LoggerConsolePlugin();
    spyOn(console, 'log').andReturn(Function.apply());

    defaultData = {
      timestamp:  '2014-06-27 01:02:03',
      logger:     'NAME',
      level:      null,
      pid:        process.pid,
      metadata:   null,
      message:    null
    };
    defaultMessage = util.format('%s | %s::%s | PID: %s - ',
      defaultData.timestamp, defaultData.logger, '%s', defaultData.pid);
  });

  describe('#ctor', function(){

    describe('without configuration', function(){

      it('returns object with default config when null', function(){
        plugin = new LoggerConsolePlugin(null);
        expect(plugin.config).toEqual({
          level: 'debug',
          timeFormat: 'YYYY-MM-DD HH:mm:ss',
          messageFormat: '%time | %logger::%level | PID: %pid - %msg',
          json: false,
          prettyPrint: false
        });
      });

      it('returns object with default config when empty hash', function(){
        plugin = new LoggerConsolePlugin({});
        expect(plugin.config).toEqual({
          level: 'debug',
          timeFormat: 'YYYY-MM-DD HH:mm:ss',
          messageFormat: '%time | %logger::%level | PID: %pid - %msg',
          json: false,
          prettyPrint: false
        });
      });

    });

    describe('with configuration', function(){

      it('returns object with partial default config when partial hash', function(){
        plugin = new LoggerConsolePlugin({ level: 'info' });
        expect(plugin.config).toEqual({
          level: 'info',
          timeFormat: 'YYYY-MM-DD HH:mm:ss',
          messageFormat: '%time | %logger::%level | PID: %pid - %msg',
          json: false,
          prettyPrint: false
        });
      });

      it('returns object with config', function(){
        var config = {
          level: 'error',
          timeFormat: 'moment format',
          messageFormat: 'message format',
          json: true,
          prettyPrint: true
        };
        plugin = new LoggerConsolePlugin(config);
        expect(plugin.config).toEqual(config);
      });

    });

  });

  describe('#level', function(){

    it('returns level property', function() {
      expect(plugin.level).toEqual('debug');
    });

    it('sets level property', function() {
      plugin.level = 'info';
      expect(plugin.level).toEqual('info');
    });

    it('does not do log on invalid level', function(){
      plugin.level = 'wtf';
      plugin.debug('name', "LOG MESSAGE");
      expect(console.log).not.toHaveBeenCalled();
    });

  });

  describe('#trace', function(){

    beforeEach(function(){
      plugin.level = 'trace';
    });

    it('does not output when level is higher', function(){
      plugin.level = 'error';
      plugin.trace('name', null, "LOG MESSAGE");
      expect(console.log).not.toHaveBeenCalled();
    });

    describe('in json format', function(){
      beforeEach(function(){
        plugin.config.json = true;
        defaultData.level = 'TRACE';
      });

      it('outputs log into console.log', function(){
        defaultData.message = "LOG MESSAGE";
        plugin.trace('2014-06-27T01:02:03.516Z', 'name', null, "LOG MESSAGE");
        expect(console.log).toHaveBeenCalledWith(JSON.stringify(defaultData));
      });

      it('outputs metadata into console.log', function(){
        var metadata = { header: 'test' };
        defaultData.metadata = metadata;
        plugin.trace('2014-06-27T01:02:03.516Z', 'name', metadata);
        expect(console.log).toHaveBeenCalledWith(JSON.stringify(defaultData));
      });

      it('outputs metadata and log into console.log', function() {
        var metadata = { header: 'test' };
        defaultData.metadata = metadata;
        defaultData.message = 'LOG MESSAGE';
        plugin.trace('2014-06-27T01:02:03.516Z', 'name', metadata, 'LOG MESSAGE');
        expect(console.log).toHaveBeenCalledWith(JSON.stringify(defaultData));
      });

      it('outputs error into console.log', function(){
        var error = new Error("error");
        error.stack = "stack";
        defaultData.message = error.stack;
        plugin.trace('2014-06-27T01:02:03.516Z', 'name', null, error);
        expect(console.log).toHaveBeenCalledWith(JSON.stringify(defaultData));
      });

      it('outputs log into console.log with args', function(){
        defaultData.message = "LOG MESSAGE 1";
        plugin.trace('2014-06-27T01:02:03.516Z', 'name', null, "LOG MESSAGE %s", 1);
        expect(console.log).toHaveBeenCalledWith(JSON.stringify(defaultData));
      });

      it('outputs metadata and error into console.log', function(){
        var metadata = { header: 'test' };
        var error = new Error("error");
        error.stack = "stack";
        defaultData.message = error.stack;
        defaultData.metadata = metadata;
        plugin.trace('2014-06-27T01:02:03.516Z', 'name', metadata, error);
        expect(console.log).toHaveBeenCalledWith(JSON.stringify(defaultData));
      });

      it('outputs metadata and log into console.log with args', function(){
        var metadata = { header: 'test' };
        defaultData.message = "LOG MESSAGE 1";
        defaultData.metadata = metadata;
        plugin.trace('2014-06-27T01:02:03.516Z', 'name', metadata, "LOG MESSAGE %s", 1);

      });

      it('pretty prints', function(){
        var metadata = { header: 'test' };
        plugin.config.prettyPrint = true;
        defaultData.message = "LOG MESSAGE 1";
        defaultData.metadata = metadata;
        plugin.trace('2014-06-27T01:02:03.516Z', 'name', metadata, "LOG MESSAGE %s", 1);
        expect(console.log).toHaveBeenCalledWith(JSON.stringify(defaultData, null, 2));
      });
    });

    describe('in text format', function(){
      beforeEach(function(){
        defaultMessage = util.format(defaultMessage, 'TRACE');
      });

      it('outputs log into console.log', function(){
        plugin.trace('2014-06-27T01:02:03.516Z', 'name', null, "LOG MESSAGE");
        expect(console.log).toHaveBeenCalledWith(defaultMessage + "LOG MESSAGE");
      });

      it('outputs metadata and log into console.log', function(){
        var metadata = { header: 'test' };
        defaultData.metadata = metadata;
        plugin.trace('2014-06-27T01:02:03.516Z', 'name', metadata, "LOG MESSAGE");
        expect(console.log).toHaveBeenCalledWith(defaultMessage + "LOG MESSAGE");
      });

      it('outputs error into console.log', function(){
        var error = new Error("error");
        error.stack = "stack";
        plugin.trace('2014-06-27T01:02:03.516Z', 'name', null, error);
        expect(console.log).toHaveBeenCalledWith(defaultMessage + error.stack);
      });

      it('outputs metadata and error into console.log', function(){
        var error = new Error("error");
        var metadata = { header: 'test' };
        defaultData.metadata = metadata;
        error.stack = "stack";
        plugin.trace('2014-06-27T01:02:03.516Z', 'name', metadata, error);
        expect(console.log).toHaveBeenCalledWith(defaultMessage + error.stack);
      });

      it('outputs log into console.log with args', function(){
        plugin.trace('2014-06-27T01:02:03.516Z', 'name', null, "LOG MESSAGE %s", 1);
        expect(console.log).toHaveBeenCalledWith(defaultMessage + "LOG MESSAGE 1");
      });

      it('outputs metadata and log into console.log with args', function(){
        var metadata = { header: 'test' };
        defaultData.metadata = metadata;
        plugin.trace('2014-06-27T01:02:03.516Z', 'name', metadata, "LOG MESSAGE %s", 1);
        expect(console.log).toHaveBeenCalledWith(defaultMessage + "LOG MESSAGE 1");
      });

      it('pretty prints', function(){
        var metadata = { header: 'test' };
        plugin.config.prettyPrint = true;
        plugin.config.messageFormat = '%time | %logger::%level | PID: %pid - %msg | %metadata';
        defaultData.message = "LOG MESSAGE 1";
        defaultData.metadata = metadata;
        plugin.trace('2014-06-27T01:02:03.516Z', 'name', metadata, "LOG MESSAGE %s", 1);
        expect(console.log).toHaveBeenCalledWith(defaultMessage + "LOG MESSAGE 1 | " + JSON.stringify(metadata, null, 2));
      });
    });

  });

  describe('#debug', function(){

    beforeEach(function(){
      plugin.level = 'debug';
      defaultMessage = util.format(defaultMessage, 'DEBUG');
    });

    it('does not output when level is higher', function(){
      plugin.level = 'error';
      plugin.debug('2014-06-27T01:02:03.516Z', 'name', null, "LOG MESSAGE");
      expect(console.log).not.toHaveBeenCalled();
    });

    it('outputs log into console.log', function(){
      plugin.debug('2014-06-27T01:02:03.516Z', 'name', null, "LOG MESSAGE");
      expect(console.log).toHaveBeenCalledWith(defaultMessage + "LOG MESSAGE");
    });

    it('outputs error into console.log', function(){
      var error = new Error("error");
      error.stack = "stack";
      plugin.debug('2014-06-27T01:02:03.516Z', 'name', null, error);
      expect(console.log).toHaveBeenCalledWith(defaultMessage + error.stack);
    });

    it('outputs log into console.log with args', function(){
      plugin.debug('2014-06-27T01:02:03.516Z', 'name', null, "LOG MESSAGE %s", 1);
      expect(console.log).toHaveBeenCalledWith(defaultMessage + "LOG MESSAGE 1");
    });

  });

  describe('#info', function(){

    beforeEach(function(){
      plugin.level = 'info';
      defaultMessage = util.format(defaultMessage, 'INFO');
    });

    it('does not output when level is higher', function(){
      plugin.level = 'error';
      plugin.info('2014-06-27T01:02:03.516Z', 'name', null, "LOG MESSAGE");
      expect(console.log).not.toHaveBeenCalled();
    });

    it('outputs log into console.log', function(){
      plugin.info('2014-06-27T01:02:03.516Z', 'name', null, "LOG MESSAGE");
      expect(console.log).toHaveBeenCalledWith(defaultMessage + "LOG MESSAGE");
    });

    it('outputs error into console.log', function(){
      var error = new Error("error");
      error.stack = "stack";
      plugin.info('2014-06-27T01:02:03.516Z', 'name', null, error);
      expect(console.log).toHaveBeenCalledWith(defaultMessage + error.stack);
    });

    it('outputs log into console.log with args', function(){
      plugin.info('2014-06-27T01:02:03.516Z', 'name', null, "LOG MESSAGE %s", 1);
      expect(console.log).toHaveBeenCalledWith(defaultMessage + "LOG MESSAGE 1");
    });

  });

  describe('#warn', function(){

    beforeEach(function(){
      plugin.level = 'warn';
      defaultMessage = util.format(defaultMessage, 'WARN');
    });

    it('does not output when level is higher', function(){
      plugin.level = 'error';
      plugin.warn('2014-06-27T01:02:03.516Z', 'name', null, "LOG MESSAGE");
      expect(console.log).not.toHaveBeenCalled();
    });

    it('outputs log into console.log', function(){
      plugin.warn('2014-06-27T01:02:03.516Z', 'name', null, "LOG MESSAGE");
      expect(console.log).toHaveBeenCalledWith(defaultMessage + "LOG MESSAGE");
    });

    it('outputs error into console.log', function(){
      var error = new Error("error");
      error.stack = "stack";
      plugin.warn('2014-06-27T01:02:03.516Z', 'name', null, error);
      expect(console.log).toHaveBeenCalledWith(defaultMessage + error.stack);
    });

    it('outputs log into console.log with args', function(){
      plugin.warn('2014-06-27T01:02:03.516Z', 'name', null, "LOG MESSAGE %s", 1);
      expect(console.log).toHaveBeenCalledWith(defaultMessage + "LOG MESSAGE 1");
    });

  });

  describe('#error', function(){

    beforeEach(function(){
      plugin.level = 'error';
      defaultMessage = util.format(defaultMessage, 'ERROR');
    });

    it('outputs log into console.log', function(){
      plugin.error('2014-06-27T01:02:03.516Z', 'name', null, "LOG MESSAGE");
      expect(console.log).toHaveBeenCalledWith(defaultMessage + "LOG MESSAGE");
    });

    it('outputs error into console.log', function(){
      var error = new Error("error");
      error.stack = "stack";
      plugin.error('2014-06-27T01:02:03.516Z', 'name', null, error);
      expect(console.log).toHaveBeenCalledWith(defaultMessage + error.stack);
    });

    it('outputs log into console.log with args', function(){
      plugin.error('2014-06-27T01:02:03.516Z', 'name', null, "LOG MESSAGE %s", 1);
      expect(console.log).toHaveBeenCalledWith(defaultMessage + "LOG MESSAGE 1");
    });

  });

  describe('#isDebug',function(){

    it('returns true when level in trace',function() {
      plugin.level = 'trace';
      expect(plugin.isDebug()).toEqual(true);
    });

    it('returns true when level in debug',function() {
      plugin.level = 'debug';
      expect(plugin.isDebug()).toEqual(true);
    });

    it('returns false when level not in trace or debug',function(){
      plugin.level = 'info';
      expect(plugin.isDebug()).toEqual(false);
    });

  });

});
