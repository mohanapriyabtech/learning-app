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
var _sendVerificationLink = require("./send-verification-link");
var _mailContent = _interopRequireDefault(require("../../../../../utils/mail-content"));
var SignupController = /*#__PURE__*/function () {
  function SignupController() {
    (0, _classCallCheck2.default)(this, SignupController);
  }

  /**
    * @description   api to user signup
    * @param {*} req /api/v1/user/signup
    * @param {*} res 
    */
  (0, _createClass2.default)(SignupController, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
        var user, session, updates;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              req.body.password = (0, _encrypt.encrypt)(req.body.password);
              _context.next = 4;
              return _userModel.User.create(req.body);
            case 4:
              user = _context.sent;
              if (!user) {
                _context.next = 15;
                break;
              }
              _context.next = 8;
              return (0, _encrypt.createSession)(user);
            case 8:
              session = _context.sent;
              _context.next = 11;
              return (0, _sendVerificationLink.setToken)(user.email);
            case 11:
              updates = _context.sent;
              return _context.abrupt("return", _responseHandler.responseHandler.successResponse(res, {
                user: user,
                session: session
              }, "user signup successfull", 200));
            case 15:
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, {}, 'signup failed', 400));
            case 16:
              _context.next = 22;
              break;
            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, _context.t0));
            case 22:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 18]]);
      }));
      function create(_x, _x2) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
  }]);
  return SignupController;
}();
var _default = exports.default = new SignupController();
//# sourceMappingURL=sign-up-user.js.map