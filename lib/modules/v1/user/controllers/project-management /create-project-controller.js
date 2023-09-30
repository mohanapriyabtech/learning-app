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
var _responseHandler = require("../../../../../utils/response-handler");
var _projectModel = require("../../models/project-model");
var _uuid = require("uuid");
var ProjectCreateController = /*#__PURE__*/function () {
  function ProjectCreateController() {
    (0, _classCallCheck2.default)(this, ProjectCreateController);
  }

  /**
   * @description   API to create project
   * @param {*} req /api/v1/admin/create-project
   * @param {*} res 
   */
  (0, _createClass2.default)(ProjectCreateController, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
        var project, senderId;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              project = new _projectModel.Project(req.body); // Generate a UUID
              project.api_key = (0, _uuid.v4)();
              console.log(req.headers.authorization, "");
              senderId = JSON.parse((0, _encrypt.decrypt)(req.headers.authorization));
              project.user_id = senderId.user._id;
              project.save().then(function (result) {
                return _responseHandler.responseHandler.successResponse(res, result, "Project created successfully", 200);
              }).catch(function (err) {
                return _responseHandler.responseHandler.errorResponse(res, err);
              });
              _context.next = 12;
              break;
            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, _context.t0));
            case 12:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 9]]);
      }));
      function create(_x, _x2) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
  }]);
  return ProjectCreateController;
}();
var _default = exports.default = new ProjectCreateController();
//# sourceMappingURL=create-project-controller.js.map