"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _responseHandler = require("../../../../../utils/response-handler");
var _encrypt = require("../../../../../utils/encrypt");
var LogoutController = /*#__PURE__*/function () {
  function LogoutController() {
    (0, _classCallCheck2.default)(this, LogoutController);
  }

  /**
    * @description   api to user login
    * @param {*} req /api/v1/user/login
    * @param {*} res 
    */
  (0, _createClass2.default)(LogoutController, [{
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
        var token, user;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              token = req.headers.authorization.split(" ")[1];
              _context.next = 4;
              return (0, _encrypt.logoutSession)(token);
            case 4:
              user = _context.sent;
              if (!user) {
                _context.next = 9;
                break;
              }
              return _context.abrupt("return", _responseHandler.responseHandler.successResponse(res, {}, "User logged out successfull", 200));
            case 9:
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, {}, "In valid session", 400));
            case 10:
              _context.next = 15;
              break;
            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, _context.t0));
            case 15:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 12]]);
      }));
      function _delete(_x, _x2) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }]);
  return LogoutController;
}();
var _default = exports.default = new LogoutController();
//# sourceMappingURL=logout.js.map