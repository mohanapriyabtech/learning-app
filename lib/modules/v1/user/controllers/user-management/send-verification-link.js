"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setToken = exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _mailContent = _interopRequireDefault(require("../../../../../utils/mail-content"));
var _responseHandler = require("../../../../../utils/response-handler");
var _userModel = require("../../models/user-model");
var _crypto = _interopRequireDefault(require("crypto"));
var SendVerificationLink = /*#__PURE__*/function () {
  function SendVerificationLink() {
    (0, _classCallCheck2.default)(this, SendVerificationLink);
  }

  /**
   * @description   API for Password Reset Token Link send thorugh Email 
   * @param {*} req /api/v1/user/password-reset-link-mail
   * @param {*} res 
   */
  (0, _createClass2.default)(SendVerificationLink, [{
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
              updates = setToken(user.email); // send email 
              _context.next = 9;
              return _mailContent.default.verificationMail(updates);
            case 9:
              if (!updates) {
                _context.next = 13;
                break;
              }
              return _context.abrupt("return", _responseHandler.responseHandler.successResponse(res, {}, "Verification sent successfully", 200));
            case 13:
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, {}, "Failed to send verification mail", 400));
            case 14:
              _context.next = 19;
              break;
            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, _context.t0));
            case 19:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 16]]);
      }));
      function update(_x, _x2) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
  }]);
  return SendVerificationLink;
}();
var _default = exports.default = new SendVerificationLink();
var setToken = exports.setToken = function setToken(email) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(resolve, reject) {
      var resetToken, resetTokenExpires, updates;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            // Generate and set password reset token
            resetToken = _crypto.default.randomBytes(32).toString("hex");
            resetTokenExpires = Date.now() + 3600000; // 60 minutes
            _context2.next = 5;
            return _userModel.User.findOneAndUpdate({
              email: email
            }, {
              reset_token: resetToken,
              token_expires: resetTokenExpires
            }, {
              new: true
            });
          case 5:
            updates = _context2.sent;
            resolve(updates);
            _context2.next = 12;
            break;
          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            reject(_context2.t0);
          case 12:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 9]]);
    }));
    return function (_x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }());
};
//# sourceMappingURL=send-verification-link.js.map