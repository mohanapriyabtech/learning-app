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
var _adminModel = require("../../models/admin-model");
var GetAdminController = /*#__PURE__*/function () {
  function GetAdminController() {
    (0, _classCallCheck2.default)(this, GetAdminController);
  }

  /**
    * @description   api to get admin details
    * @param {*} req /api/v1/admin/get-admin/:id
    * @param {*} res 
    */
  (0, _createClass2.default)(GetAdminController, [{
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
        var result;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _adminModel.Admin.findById(req.params.id);
            case 3:
              result = _context.sent;
              if (!result) {
                _context.next = 8;
                break;
              }
              return _context.abrupt("return", _responseHandler.responseHandler.successResponse(res, result, "Admin details retrived successfull", 200));
            case 8:
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, {}, "Admin details not found", 400));
            case 9:
              _context.next = 14;
              break;
            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, _context.t0));
            case 14:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 11]]);
      }));
      function get(_x, _x2) {
        return _get.apply(this, arguments);
      }
      return get;
    }()
  }]);
  return GetAdminController;
}();
var _default = exports.default = new GetAdminController();
//# sourceMappingURL=get-admin.js.map