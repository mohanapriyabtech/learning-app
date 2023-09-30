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
var _adminModel = require("../../models/admin-model");
var SignupController = /*#__PURE__*/function () {
  function SignupController() {
    (0, _classCallCheck2.default)(this, SignupController);
  }

  /**
    * @description   api to admin signup
    * @param {*} req /api/v1/admin/signup
    * @param {*} res 
    */
  (0, _createClass2.default)(SignupController, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
        var user, session;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              req.body.password = (0, _encrypt.encrypt)(req.body.password);
              _context.next = 4;
              return _adminModel.Admin.create(req.body);
            case 4:
              user = _context.sent;
              if (!user) {
                _context.next = 12;
                break;
              }
              _context.next = 8;
              return (0, _encrypt.createSession)(user);
            case 8:
              session = _context.sent;
              return _context.abrupt("return", _responseHandler.responseHandler.successResponse(res, {
                user: user,
                session: session
              }, "admin signup successfull", 200));
            case 12:
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, {}, "admin creation failed", 400));
            case 13:
              _context.next = 18;
              break;
            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, _context.t0));
            case 18:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 15]]);
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
//# sourceMappingURL=signup-admin.js.map