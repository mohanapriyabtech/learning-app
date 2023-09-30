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
var _mailSender = _interopRequireDefault(require("./mail-sender"));
var MailContent = /*#__PURE__*/function () {
  function MailContent() {
    (0, _classCallCheck2.default)(this, MailContent);
  }
  (0, _createClass2.default)(MailContent, [{
    key: "verificationMail",
    value: function () {
      var _verificationMail = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(user) {
        var url, subject, content, success;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              url = "http://".concat(process.env.MONGODB_HOST, "/layeroneX/verification?token=").concat(user.reset_token, "&id=").concat(user._id);
              subject = 'Verify Your Email Address';
              content = "<!DOCTYPE html>\n            <html>\n            <head>\n                <meta charset=\"utf-8\">\n                <title>Verify Your Email Address</title>\n            </head>\n            <body style=\"background-color: #F5F5F5; font-family: Arial, sans-serif; color: #333333; line-height: 1.5; margin: 0; padding: 0;\">\n                <h1 style=\"color: #333333; font-weight: bold; line-height: 1.2; margin: 0; padding: 0;\">Please verify your email address</h1>\n                <p>Dear ".concat(user.name, ",</p>\n                <p>Thank you for signing up for our service. Before we can activate your account, we need to verify your email address. Please click on the link below to complete the verification process:</p>\n                <a href=\"").concat(url, "\" style=\"color: #008000; text-decoration: none;\">Verify My Email Address</a>\n                <p>If the link does not work, you can copy and paste the following URL into your browser:</p>\n                <p style=\"margin: 0; padding: 0;\">").concat(url, "</p>\n                <p>Please note that this link is valid for 24 hours only. After that, you will need to request another verification link.</p>\n                <p>Thank you for your cooperation. If you have any questions, please don't hesitate to contact our support team.</p>\n                <p style=\"margin: 0; padding: 0;\">Best regards,</p>\n                <p style=\"margin: 0; padding: 0;\">[Your company name]</p>\n            </body>\n            </html>\n            ");
              _context.next = 6;
              return _mailSender.default.sendEmail(user.email, subject, content);
            case 6:
              success = _context.sent;
              console.log("Verification email sent to ".concat(user.email));
              return _context.abrupt("return", success);
            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](0);
              console.error("Failed to send verification email to ".concat(user.email, ":"), _context.t0);
              throw _context.t0;
            case 15:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 11]]);
      }));
      function verificationMail(_x) {
        return _verificationMail.apply(this, arguments);
      }
      return verificationMail;
    }()
  }, {
    key: "forgetPassword",
    value: function () {
      var _forgetPassword = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(user) {
        var url, subject, content, success;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              url = "http://".concat(process.env.MONGODB_HOST, "/layeroneX/verification?token=").concat(user.reset_token, "&id=").concat(user._id);
              subject = 'Verify Your Email Address';
              content = "<!DOCTYPE html>\n            <html>\n            <head>\n                <meta charset=\"utf-8\">\n                <title>Forgot Your Password?</title>\n            </head>\n            <body style=\"background-color: #F5F5F5; font-family: Arial, sans-serif; color: #333333; line-height: 1.5; margin: 0; padding: 0;\">\n                <h1 style=\"color: #333333; font-weight: bold; line-height: 1.2; margin: 0; padding: 0;\">Forgot Your Password?</h1>\n                <p>Dear ".concat(user.name, ",</p>\n                <p>We received a request to reset your password. Please click on the link below to create a new password:</p>\n                <a href=\"").concat(url, "\" style=\"color: #008000; text-decoration: none;\">Reset My Password</a>\n                <p>If the link does not work, you can copy and paste the following URL into your browser:</p>\n                <p style=\"margin: 0; padding: 0;\">").concat(url, "</p>\n                <p>Please note that this link is valid for 24 hours only. After that, you will need to request another password reset.</p>\n                <p>Thank you for your cooperation. If you have any questions, please don't hesitate to contact our support team.</p>\n                <p style=\"margin: 0; padding: 0;\">Best regards,</p>\n                <p style=\"margin: 0; padding: 0;\">[Your company name]</p>\n            </body>\n            </html>");
              _context2.next = 6;
              return _mailSender.default.sendEmail(user.email, subject, content);
            case 6:
              success = _context2.sent;
              console.log("Verification email sent to ".concat(user.email));
              return _context2.abrupt("return", success);
            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](0);
              console.error("Failed to send verification email to ".concat(user.email, ":"), _context2.t0);
              throw _context2.t0;
            case 15:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 11]]);
      }));
      function forgetPassword(_x2) {
        return _forgetPassword.apply(this, arguments);
      }
      return forgetPassword;
    }()
  }, {
    key: "passwordResetSuccess",
    value: function () {
      var _passwordResetSuccess = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(user) {
        var url, subject, content, success;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              url = "http://".concat(process.env.MONGODB_HOST, "/layeroneX/verification?token=").concat(user.reset_token, "&id=").concat(user._id);
              subject = 'Verify Your Email Address';
              content = "<!DOCTYPE html>\n            <html lang=\"en\">\n            <head>\n              <meta charset=\"UTF-8\">\n              <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n              <title>Password Reset Successful</title>\n            </head>\n            <body style=\"font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;\">\n              <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\" style=\"border-collapse: collapse; margin: 20px auto; background-color: #ffffff; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);\">\n                <tr>\n                  <td style=\"padding: 20px;\">\n                    <h2 style=\"color: #333;\">Password Reset Successful, ".concat(user.name, "</h2>\n                    <p>Dear ").concat(user.name, ",</p>\n                    <p>Your password has been successfully reset. You can now log in using your new password.</p>\n                    <p>If you did not request this password reset, please contact our support team immediately.</p>\n                    <p>Thank you for using our services!</p>\n                    <p>Best regards,<br>Your Company Name</p>\n                  </td>\n                </tr>\n                <tr>\n                  <td style=\"background-color: #333; padding: 10px; text-align: center;\">\n                    <p style=\"color: #fff; margin: 0;\">\xA9 2023 Your Company Name. All rights reserved.</p>\n                  </td>\n                </tr>\n              </table>\n            </body>\n            </html>\n            \n            ");
              _context3.next = 6;
              return _mailSender.default.sendEmail(user.email, subject, content);
            case 6:
              success = _context3.sent;
              console.log("Verification email sent to ".concat(user.email));
              return _context3.abrupt("return", success);
            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](0);
              console.error("Failed to send verification email to ".concat(user.email, ":"), _context3.t0);
              throw _context3.t0;
            case 15:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 11]]);
      }));
      function passwordResetSuccess(_x3) {
        return _passwordResetSuccess.apply(this, arguments);
      }
      return passwordResetSuccess;
    }()
  }]);
  return MailContent;
}();
var _default = exports.default = new MailContent();
//# sourceMappingURL=mail-content.js.map