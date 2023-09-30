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
var _responseHandler = require("../../../../utils/response-handler");
var fs = require('fs');
require('dotenv').config();
var FileRemoveController = /*#__PURE__*/function () {
  function FileRemoveController() {
    (0, _classCallCheck2.default)(this, FileRemoveController);
  }

  /**
   * @description  API for File delete
   * @param {*} req 
   * @param {*} res 
   */
  (0, _createClass2.default)(FileRemoveController, [{
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
        var imagePath, filePath;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              imagePath = req.body.imagePath.split("".concat(process.env.MONGODB_HOST, "/"))[1];
              filePath = "/var/www/html/".concat(imagePath);
              if (fs.existsSync(filePath)) {
                _context.next = 5;
                break;
              }
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, {}, "Image Not Exist", 400));
            case 5:
              if (fs.existsSync(filePath)) {
                fs.unlink(filePath, function (err) {
                  if (err) {
                    throw err;
                  }
                  return _responseHandler.responseHandler.successResponse(res, {}, "Files Removed Successfully");
                });
              }
              _context.next = 12;
              break;
            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, _context.t0));
            case 12:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 8]]);
      }));
      function _delete(_x, _x2) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }]);
  return FileRemoveController;
}();
var _default = exports.default = new FileRemoveController();
//# sourceMappingURL=file-remove-controller.js.map