"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _joi = _interopRequireDefault(require("joi"));
var _responseHandler = require("../../../../utils/response-handler");
_joi.default.objectId = require('joi-objectid')(_joi.default);
var ParamsValidator = /*#__PURE__*/(0, _createClass2.default)(function ParamsValidator() {
  var _this = this;
  (0, _classCallCheck2.default)(this, ParamsValidator);
  (0, _defineProperty2.default)(this, "validate", function (req, res, next) {
    try {
      var _this$schema$validate = _this.schema.validate(req.params.id),
        error = _this$schema$validate.error;
      if (!error) {
        next();
      } else {
        return _responseHandler.responseHandler.errorResponse(res, {}, error.message, 400);
      }
    } catch (err) {
      console.error(err);
      return _responseHandler.responseHandler.errorResponse(res, err);
    }
  });
  this.schema = _joi.default.objectId().required().error(new Error("Please provide a proper id"));
});
var _default = exports.default = new ParamsValidator();
//# sourceMappingURL=params-validator.js.map