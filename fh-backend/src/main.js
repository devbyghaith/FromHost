const Web = require('./web');

const events = require('events');

const Emitter = new events.EventEmitter();
const Website = new Web();

Website.registerRouters();