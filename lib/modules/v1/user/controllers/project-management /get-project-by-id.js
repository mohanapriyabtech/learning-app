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
var _projectModel = require("../../models/project-model");
var GetCityController = /*#__PURE__*/function () {
  function GetCityController() {
    (0, _classCallCheck2.default)(this, GetCityController);
  }

  /**
   * @description   API to get project by ID
   * @param {*} req /api/v1/admin/get-project/63a56af6af119c87cca09b1d
   * @param {*} res 
   */
  (0, _createClass2.default)(GetCityController, [{
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
        var result;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _projectModel.Project.findById(req.params.id).exec();
            case 3:
              result = _context.sent;
              if (!result) {
                _context.next = 8;
                break;
              }
              return _context.abrupt("return", _responseHandler.responseHandler.successResponse(res, result, "Project details retrieved successfully"));
            case 8:
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, {}, "Project not found", 400));
            case 9:
              _context.next = 15;
              break;
            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, _context.t0));
            case 15:
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
  return GetCityController;
}();
var _default = exports.default = new GetCityController();
//# sourceMappingURL=get-project-by-id.js.map