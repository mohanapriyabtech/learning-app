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
var _userModel = require("../../models/user-model");
var VerifyEmail = /*#__PURE__*/function () {
  function VerifyEmail() {
    (0, _classCallCheck2.default)(this, VerifyEmail);
  }

  /**
   * @description   API to reset password of user
   * @param {*} req /api/v1/user/password-reset-confirmation-mail/nckjeqdho32ou2098282
   * @param {*} res 
   */
  (0, _createClass2.default)(VerifyEmail, [{
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              // check the reset token expiration
              _userModel.User.findOneAndUpdate({
                _id: req.params.id,
                reset_token: req.body.token,
                token_expires: {
                  $gt: Date.now()
                }
              }, {
                $unset: {
                  reset_token: 1,
                  token_expires: 1
                },
                email_verified: 1
              }, {
                new: true
              }).exec(function (err, result) {
                if (err) return _responseHandler.responseHandler.errorResponse(res, err);
                if (result) {
                  return _responseHandler.responseHandler.successResponse(res, result, "User email verified", 200);
                } else {
                  return _responseHandler.responseHandler.errorResponse(res, {}, 'Password reset token is invalid or has expired.', 400);
                }
              });
              _context.next = 7;
              break;
            case 4:
              _context.prev = 4;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, _context.t0));
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 4]]);
      }));
      function update(_x, _x2) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
  }]);
  return VerifyEmail;
}();
var _default = exports.default = new VerifyEmail();
//# sourceMappingURL=verify-email.js.map