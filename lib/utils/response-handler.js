"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.responseHandler = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
/**
 * response handlers
 */
var ResponseHandler = /*#__PURE__*/(0, _createClass2.default)(function ResponseHandler() {
  (0, _classCallCheck2.default)(this, ResponseHandler);
  (0, _defineProperty2.default)(this, "successResponse", function (res) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var statusCode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 200;
    return res.status(statusCode).json({
      status_code: statusCode,
      status: true,
      message: message,
      data: data
    });
  });
  (0, _defineProperty2.default)(this, "errorResponse", function (res, error, message, statusCode) {
    var err = Object.keys(error).length === 0 && error.constructor === Object || Array.isArray(error) && error.length === 0 ? error : {};
    var params = {
      status_code: 500,
      status: false,
      message: error.message,
      data: err
    };
    if (message) {
      params.message = message, params.status_code = 400;
    }
    if (statusCode) params.status_code = statusCode;
    if (error.code == 11000) {
      params.status_code = 400;
      params.message = "".concat(Object.keys(error.keyValue), " already exists");
    }
    return res.status(params.status_code).json(params);
  });
});
var responseHandler = exports.responseHandler = new ResponseHandler();
//# sourceMappingURL=response-handler.js.map