"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.helper = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _adminModel = require("../modules/v1/admin/models/admin-model");
var _sessionModel = require("../modules/v1/admin/models/session-model");
var _userModel = require("../modules/v1/user/models/user-model");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * helper class for chat
 */
var ChatHelper = /*#__PURE__*/function () {
  function ChatHelper() {
    (0, _classCallCheck2.default)(this, ChatHelper);
    (0, _defineProperty2.default)(this, "clients", new Map());
    (0, _defineProperty2.default)(this, "userDetails", []);
  }
  (0, _createClass2.default)(ChatHelper, [{
    key: "addClient",
    value: function addClient(socket) {
      var clientId = socket.handshake.query.id;
      if (!this.clients.has(clientId)) {
        this.clients.set(clientId, []);
      }
      this.clients.get(clientId).push({
        id: socket.id,
        socket: socket
      });
      this.logClientTable(); // Call the method here to log the updated client list
    }
  }, {
    key: "removeClientById",
    value: function removeClientById(id, socketId) {
      if (this.clients.has(id)) {
        var clientSet = this.clients.get(id);
        clientSet = clientSet.filter(function (client) {
          return client.id !== socketId;
        });
        if (clientSet.length === 0) {
          this.clients.delete(id);
        } else {
          this.clients.set(id, clientSet);
        }
        console.log("Client removed: ".concat(id));
        this.logClientTable();
        return clientSet;
      }
    }
  }, {
    key: "logClientTable",
    value: function logClientTable() {
      var table = [];
      this.clients.forEach(function (clientSet, clientId) {
        table.push({
          ID: clientId,
          Sockets: clientSet.map(function (client) {
            return client.id;
          }).join(', ')
        });
      });
      console.table(table);
    }
  }, {
    key: "sendToSocketClient",
    value: function () {
      var _sendToSocketClient = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(receiver, event, message) {
        var clientsArray, _iterator, _step, client, socket;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              console.log('Sending event:', event);
              console.log('Receiver:', receiver);
              console.log('Message:', message);
              clientsArray = this.clients.get(receiver);
              if (clientsArray !== undefined && clientsArray.length !== 0) {
                _iterator = _createForOfIteratorHelper(clientsArray);
                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    client = _step.value;
                    socket = client.socket;
                    if (socket !== undefined) {
                      console.log("Emitting event \"".concat(event, "\" to user with ID: ").concat(receiver));
                      try {
                        socket.emit(event, message);
                      } catch (error) {
                        console.error("Error emitting event: ".concat(error));
                      }
                    }
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
              }
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function sendToSocketClient(_x, _x2, _x3) {
        return _sendToSocketClient.apply(this, arguments);
      }
      return sendToSocketClient;
    }()
  }, {
    key: "sendToSocketClients",
    value: function sendToSocketClients(receiver, event, message) {
      if (typeof receiver === 'string') {
        this.sendToSocketClient(receiver, event, message);
      } else if (Array.isArray(receiver)) {
        var _iterator2 = _createForOfIteratorHelper(receiver),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var clientId = _step2.value;
            this.sendToSocketClient(clientId.toString(), event, message); // Convert ObjectId to string
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      } else {
        console.log('Invalid receiver parameter:', receiver);
      }
    }
  }, {
    key: "checkAuthentication",
    value: function () {
      var _checkAuthentication = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(token, id) {
        var _yield$Promise$all, _yield$Promise$all2, checkMember, checkAdmin, session;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return Promise.all([_userModel.User.findById(id), _adminModel.Admin.findById(id)]);
            case 2:
              _yield$Promise$all = _context2.sent;
              _yield$Promise$all2 = (0, _slicedToArray2.default)(_yield$Promise$all, 2);
              checkMember = _yield$Promise$all2[0];
              checkAdmin = _yield$Promise$all2[1];
              if (!(!checkMember && !checkAdmin)) {
                _context2.next = 9;
                break;
              }
              console.log('not a user');
              return _context2.abrupt("return", false);
            case 9:
              _context2.next = 11;
              return _sessionModel.Session.findOne({
                session_token: token,
                status: 1
              }).exec();
            case 11:
              session = _context2.sent;
              if (session) {
                _context2.next = 15;
                break;
              }
              console.log('session not found');
              return _context2.abrupt("return", false);
            case 15:
              if (!(session.user_id != id)) {
                _context2.next = 18;
                break;
              }
              console.log('user id mismatch');
              return _context2.abrupt("return", false);
            case 18:
              return _context2.abrupt("return", true);
            case 19:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function checkAuthentication(_x4, _x5) {
        return _checkAuthentication.apply(this, arguments);
      }
      return checkAuthentication;
    }()
  }]);
  return ChatHelper;
}();
var helper = exports.helper = new ChatHelper();
//# sourceMappingURL=socket.io-helper.js.map