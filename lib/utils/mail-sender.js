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
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _index = require("../config/index");
var _base = _interopRequireDefault(require("../config/base"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
// Mail Configuration
var MailConfig = /*#__PURE__*/function (_BaseConfig) {
  (0, _inherits2.default)(MailConfig, _BaseConfig);
  var _super = _createSuper(MailConfig);
  function MailConfig() {
    (0, _classCallCheck2.default)(this, MailConfig);
    return _super.call(this);
  }

  // Email config
  (0, _createClass2.default)(MailConfig, [{
    key: "sendEmail",
    value: function () {
      var _sendEmail = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(email, subject, text) {
        var transporter, mailOptions;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              transporter = _nodemailer.default.createTransport({
                host: _index.config.ENV.SMTP_HOST,
                // 'smtp.zoho.com',
                secure: true,
                port: _index.config.ENV.SMTP_HOST,
                // 465,
                auth: {
                  user: _index.config.ENV.SMTP_USERNAME,
                  pass: _index.config.ENV.SMTP_PASSWORD
                }
              });
              mailOptions = {
                from: _index.config.ENV.EMAIL_FROM,
                // sender address
                to: email,
                // receiver address
                subject: subject,
                attachDataUrls: true,
                html: text
              };
              return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve, reject) {
                  return _regenerator.default.wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        transporter.sendMail(mailOptions, function (err, info) {
                          if (err) {
                            console.log(err.message);
                            resolve(err.message);
                          } else {
                            resolve('mailSent');
                          }
                        });
                      case 1:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));
                return function (_x4, _x5) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 3:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function sendEmail(_x, _x2, _x3) {
        return _sendEmail.apply(this, arguments);
      }
      return sendEmail;
    }()
  }]);
  return MailConfig;
}(_base.default);
var _default = exports.default = new MailConfig();
//# sourceMappingURL=mail-sender.js.map