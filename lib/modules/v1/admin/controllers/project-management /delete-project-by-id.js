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
var _projectModel = require("../../../user/models/project-model");
var DeleteProjectController = /*#__PURE__*/function () {
  function DeleteProjectController() {
    (0, _classCallCheck2.default)(this, DeleteProjectController);
  }

  /**
    * @description   api to user signup
    * @param {*} req /api/v1/user/delete/:id
    * @param {*} res 
    */
  (0, _createClass2.default)(DeleteProjectController, [{
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
        var result;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _projectModel.Project.findByIdAndDelete(req.params.id);
            case 3:
              result = _context.sent;
              if (!result) {
                _context.next = 8;
                break;
              }
              return _context.abrupt("return", _responseHandler.responseHandler.successResponse(res, result, "Project details deleted successfull", 200));
            case 8:
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, {}, "Project not found", 400));
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
      function _delete(_x, _x2) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }]);
  return DeleteProjectController;
}();
var _default = exports.default = new DeleteProjectController();
//# sourceMappingURL=delete-project-by-id.js.map