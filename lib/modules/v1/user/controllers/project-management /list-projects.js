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
var ListprojectController = /*#__PURE__*/function () {
  function ListprojectController() {
    (0, _classCallCheck2.default)(this, ListprojectController);
  }

  /**
    * @description   api to get project details
    * @param {*} req /api/v1/project/get-project/:id
    * @param {*} res 
    */
  (0, _createClass2.default)(ListprojectController, [{
    key: "list",
    value: function () {
      var _list = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
        var result, senderId;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _projectModel.Project.find();
            case 3:
              result = _context.sent;
              senderId = JSON.parse(decrypt(req.headers.authorization));
              console.log(senderId, "-----------");
              if (!(result.length != 0)) {
                _context.next = 10;
                break;
              }
              return _context.abrupt("return", _responseHandler.responseHandler.successResponse(res, result, "project list retrived successfull", 200));
            case 10:
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, result, "No projects found", 200));
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
      function list(_x, _x2) {
        return _list.apply(this, arguments);
      }
      return list;
    }()
  }]);
  return ListprojectController;
}();
var _default = exports.default = new ListprojectController();
//# sourceMappingURL=list-projects.js.map