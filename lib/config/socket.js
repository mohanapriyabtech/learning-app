"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventHandler = exports.default = exports.EVENTS = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _socket = _interopRequireDefault(require("socket.io"));
var _socket2 = require("../utils/socket.io-helper");
var SocketConfig = exports.default = /*#__PURE__*/function () {
  function SocketConfig(server) {
    (0, _classCallCheck2.default)(this, SocketConfig);
    var socketParams = {
      cors: {
        origin: process.env.WHITE_LISTED_DOMAINS ? process.env.WHITE_LISTED_DOMAINS.split(',') : '*',
        methods: ["GET", "POST"]
      },
      transports: ['websocket', 'polling']
    };
    this.socket = (0, _socket.default)(server, socketParams);
  }

  /**
   * @param {*} socket 
   */
  (0, _createClass2.default)(SocketConfig, [{
    key: "onConnection",
    value: function () {
      var _onConnection = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(socket) {
        var checkAuth;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              console.log('new connection');
              _context.next = 3;
              return _socket2.helper.checkAuthentication(socket.handshake.query.Authorization, socket.handshake.query.id);
            case 3:
              checkAuth = _context.sent;
              if (socket.handshake.query.id == 'null' || socket.handshake.query.id === '' || socket.handshake.query.id === undefined || !checkAuth) {
                socket.disconnect();
                console.log("connection failed socket id ".concat(socket.id));
              } else {
                //add to client array
                _socket2.helper.addClient(socket);
                console.log("A user has logged in on " + socket.handshake.query.id);

                //listner functions
                eventHandler(socket);
                // check on disconnected(socket);
                socket.on(EVENTS.DISCONNECT, function (reason) {
                  _socket2.helper.removeClientById(socket.handshake.query.id, socket.id);
                  //display client after disconnect
                  console.log("a user disconneted ".concat(socket.handshake.query.id, " with socket id ").concat(socket.id, " due to ").concat(reason));
                });
              }
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function onConnection(_x) {
        return _onConnection.apply(this, arguments);
      }
      return onConnection;
    }()
  }]);
  return SocketConfig;
}();
var EVENTS = exports.EVENTS = {
  DISCONNECT: 'disconnect'
};
var eventHandler = exports.eventHandler = function eventHandler(socket) {
  socket.on(EVENTS.PING, function () {
    _socket2.helper.sendToSocketClients(socket.handshake.query.id, 'PING', {
      message: 'pong'
    });
  });
};
//# sourceMappingURL=socket.js.map