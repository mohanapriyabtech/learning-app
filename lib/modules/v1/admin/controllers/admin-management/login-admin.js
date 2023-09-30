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
var LoginController = /*#__PURE__*/function () {
  function LoginController() {
    (0, _classCallCheck2.default)(this, LoginController);
  }

  /**
    * @description   api to admin login
    * @param {*} req /api/v1/admin/login
    * @param {*} res 
    */
  (0, _createClass2.default)(LoginController, [{
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
        var admin, session;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _adminModel.Admin.findOne({
                email: req.body.email
              });
            case 3:
              admin = _context.sent;
              if (!admin) {
                _context.next = 15;
                break;
              }
              if (!((0, _encrypt.decrypt)(user.password) === req.body.password)) {
                _context.next = 12;
                break;
              }
              _context.next = 8;
              return (0, _encrypt.createSession)(admin);
            case 8:
              session = _context.sent;
              return _context.abrupt("return", _responseHandler.responseHandler.successResponse(res, {
                admin: admin,
                session: session
              }, "Admin logged in successfull", 200));
            case 12:
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, {}, "Password wrong , try again", 400));
            case 13:
              _context.next = 16;
              break;
            case 15:
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, {}, "No admin exist with this username", 400));
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
      function get(_x, _x2) {
        return _get.apply(this, arguments);
      }
      return get;
    }()
  }]);
  return LoginController;
}();
var _default = exports.default = new LoginController();
//# sourceMappingURL=login-admin.js.map