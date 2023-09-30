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
var _mailContent = _interopRequireDefault(require("../../../../../utils/mail-content"));
var _responseHandler = require("../../../../../utils/response-handler");
var _userModel = require("../../models/user-model");
var _sendVerificationLink = require("./send-verification-link");
var SendForgotPasswordLink = /*#__PURE__*/function () {
  function SendForgotPasswordLink() {
    (0, _classCallCheck2.default)(this, SendForgotPasswordLink);
  }

  /**
   * @description   API for Password Reset Token Link send thorugh Email 
   * @param {*} req /api/v1/user/password-reset-link-mail
   * @param {*} res 
   */
  (0, _createClass2.default)(SendForgotPasswordLink, [{
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
        var user, updates;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _userModel.User.findOne({
                email: req.query.email
              }).exec();
            case 3:
              user = _context.sent;
              if (user) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, {}, "Email not found", 400));
            case 6:
              _context.next = 8;
              return (0, _sendVerificationLink.setToken)(user.email);
            case 8:
              updates = _context.sent;
              _context.next = 11;
              return _mailContent.default.forgetPassword(updates);
            case 11:
              if (!updates) {
                _context.next = 15;
                break;
              }
              return _context.abrupt("return", _responseHandler.responseHandler.successResponse(res, {}, "Verification sent successfully", 200));
            case 15:
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, {}, "Failed to send verification mail", 400));
            case 16:
              _context.next = 21;
              break;
            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, _context.t0));
            case 21:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 18]]);
      }));
      function update(_x, _x2) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
  }]);
  return SendForgotPasswordLink;
}();
var _default = exports.default = new SendForgotPasswordLink();
//# sourceMappingURL=send-forget-password-link.js.map