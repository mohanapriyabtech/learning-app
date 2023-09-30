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
var UpdateCityController = /*#__PURE__*/function () {
  function UpdateCityController() {
    (0, _classCallCheck2.default)(this, UpdateCityController);
  }

  /**
   * @descriptions   update project details
   * @param {*} req  /api/v1/admin/update-project/6384c6edb9eda24175b56c85
   * @body           
   * @param {*} res 
   */
  (0, _createClass2.default)(UpdateCityController, [{
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
        var name, description, result;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              name = req.body.name;
              description = req.body.description;
              _context.next = 5;
              return _projectModel.Project.findByIdAndUpdate(req.params.id, req.body, {
                new: true
              }).exec();
            case 5:
              result = _context.sent;
              if (!result) {
                _context.next = 10;
                break;
              }
              return _context.abrupt("return", _responseHandler.responseHandler.successResponse(res, result, "Project updated successfully"));
            case 10:
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, {}, "Project not found", 400));
            case 11:
              _context.next = 16;
              break;
            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, _context.t0));
            case 16:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 13]]);
      }));
      function update(_x, _x2) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
  }]);
  return UpdateCityController;
}();
var _default = exports.default = new UpdateCityController();
//# sourceMappingURL=update-project-controller.js.map