"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _http = _interopRequireDefault(require("http"));
var _https = _interopRequireDefault(require("https"));
var _chalk = _interopRequireDefault(require("chalk"));
var _fs = _interopRequireDefault(require("fs"));
var _index = require("./config/index");
var _routeServiceProvider = _interopRequireDefault(require("./providers/route-service-provider"));
var _socket = _interopRequireDefault(require("./config/socket"));
// package imports 

// local imports

//route service provider
var routeServiceProvider = new _routeServiceProvider.default();
var server;

//mongoDB connection
_index.mongoose.connectDB();

//sql db's connection
// sql.connectSqlDB()

_index.backup.dataBackup();
if (process.env.HTTPS == 'true') {
  var options = {
    key: _fs.default.readFileSync(process.env.SSL_KEY),
    cert: _fs.default.readFileSync(process.env.SSL_CERT),
    ca: _fs.default.readFileSync(process.env.SSL_FULLCHAIN),
    secure: true,
    reconnect: true,
    rejectUnauthorized: false
  };
  server = _https.default.createServer(options, routeServiceProvider.app);
} else {
  server = _http.default.createServer(routeServiceProvider.app);
}
// serve http request

//init socket connection
var socketConnecton = new _socket.default(server);
//on connection function
socketConnecton.socket.on('connection', socketConnecton.onConnection);

// start server
server.listen(_index.config.ENV.PORT, function () {
  if (process.send) {
    process.send('ready');
  }
  console.log(_chalk.default.green.bold.italic("app running on port ".concat(_index.config.ENV.PORT)));
});
//# sourceMappingURL=index.js.map