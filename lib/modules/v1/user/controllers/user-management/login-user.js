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
var _userModel = require("../../models/user-model");
var LoginController = /*#__PURE__*/function () {
  function LoginController() {
    (0, _classCallCheck2.default)(this, LoginController);
  }

  /**
    * @description   api to user login
    * @param {*} req /api/v1/user/login
    * @param {*} res 
    */
  (0, _createClass2.default)(LoginController, [{
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
        var user, session;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _userModel.User.findOne({
                email: req.body.email
              });
            case 3:
              user = _context.sent;
              if (!user) {
                _context.next = 19;
                break;
              }
              if (!((0, _encrypt.decrypt)(user.password) === req.body.password)) {
                _context.next = 16;
                break;
              }
              if (!(user.status == 0)) {
                _context.next = 10;
                break;
              }
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, {}, "You have been blocked by admin", 400));
            case 10:
              _context.next = 12;
              return (0, _encrypt.createSession)(user);
            case 12:
              session = _context.sent;
              return _context.abrupt("return", _responseHandler.responseHandler.successResponse(res, {
                user: user,
                session: session
              }, "User logged in successfull", 200));
            case 14:
              _context.next = 17;
              break;
            case 16:
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, {}, "Password wrong , try again", 400));
            case 17:
              _context.next = 20;
              break;
            case 19:
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, {}, "No user exist with this email", 400));
            case 20:
              _context.next = 25;
              break;
            case 22:
              _context.prev = 22;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, _context.t0));
            case 25:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 22]]);
      }));
      function get(_x, _x2) {
        return _get.apply(this, arguments);
      }
      return get;
    }()
  }]);
  return LoginController;
}();
var _default = exports.default = new LoginController();
//# sourceMappingURL=login-user.js.map