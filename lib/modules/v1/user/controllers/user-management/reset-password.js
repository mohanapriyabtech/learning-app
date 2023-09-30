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
var _encrypt = require("../../../../../utils/encrypt");
var _mailContent = _interopRequireDefault(require("../../../../../utils/mail-content"));
var _responseHandler = require("../../../../../utils/response-handler");
var _userModel = require("../../models/user-model");
var ResetUserPasswordController = /*#__PURE__*/function () {
  function ResetUserPasswordController() {
    (0, _classCallCheck2.default)(this, ResetUserPasswordController);
  }

  /**
    * @description   api to update user 
    * @param {*} req /api/v1/user/update
    * @param {*} res 
    */
  (0, _createClass2.default)(ResetUserPasswordController, [{
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
        var result;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _userModel.User.findOneAndUpdate({
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
                password: (0, _encrypt.encrypt)(req.body.password)
              }, {
                new: true
              });
            case 3:
              result = _context.sent;
              if (!result) {
                _context.next = 9;
                break;
              }
              _mailContent.default;
              return _context.abrupt("return", _responseHandler.responseHandler.successResponse(res, result, "User email verified", 200));
            case 9:
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, {}, 'Password reset token is invalid or has expired.', 400));
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
      function update(_x, _x2) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
  }]);
  return ResetUserPasswordController;
}();
var _default = exports.default = new ResetUserPasswordController();
//# sourceMappingURL=reset-password.js.map