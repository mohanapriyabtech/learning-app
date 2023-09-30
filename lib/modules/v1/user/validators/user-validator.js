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
var UserValidator = /*#__PURE__*/(0, _createClass2.default)(function UserValidator() {
  var _this = this;
  (0, _classCallCheck2.default)(this, UserValidator);
  (0, _defineProperty2.default)(this, "validateAndNext", function (schemaName) {
    return function (req, res, next) {
      var schema = _this.schemas[schemaName];
      try {
        var _schema$validate = schema.validate(req.body),
          error = _schema$validate.error;
        if (!error) {
          next();
        } else {
          var errorMessage = error.message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
          return _responseHandler.responseHandler.errorResponse(res, {}, errorMessage, 400);
        }
      } catch (err) {
        console.error(err);
        return _responseHandler.responseHandler.errorResponse(res, err);
      }
    };
  });
  (0, _defineProperty2.default)(this, "signup", this.validateAndNext('signup'));
  (0, _defineProperty2.default)(this, "login", this.validateAndNext('login'));
  (0, _defineProperty2.default)(this, "update", this.validateAndNext('update'));
  this.schemas = {
    signup: _joi.default.object({
      name: _joi.default.string().required().error(new Error("Name is required")),
      email: _joi.default.string().required().email({
        minDomainSegments: 2,
        tlds: {
          allow: ['com', 'net']
        }
      }).error(new Error("Email is required")),
      // phone_number: Joi.string()
      //     .pattern(/^\+?[0-9\s]+$/)
      //     .min(4)
      //     .max(15)
      //     .required()
      //     .messages({
      //         'string.pattern.base': 'Phone number must only contain digits',
      //         "string.min": "Phone number must be minimum 4 digit number",
      //         "string.max": "Phone number must be maximum 15 digit number",
      //         "any.required": "Phone number is required"
      //     }),
      password: _joi.default.string().required().error(new Error("Password is required"))
    }),
    login: _joi.default.object({
      email: _joi.default.string().required().error(new Error("Email is required")),
      password: _joi.default.string().required().error(new Error("Password is required"))
    }),
    update: _joi.default.object({
      name: _joi.default.string().error(new Error("Enter a valid name")),
      email: _joi.default.string().email({
        minDomainSegments: 2,
        tlds: {
          allow: ['com', 'net']
        }
      }).required().error(new Error("Enter a valid email")),
      phone_number: _joi.default.string().pattern(/^\+?[0-9\s]+$/).min(4).max(15).required().messages({
        'string.pattern.base': 'Phone number must only contain digits',
        "string.min": "Phone number must be minimum 4 digit number",
        "string.max": "Phone number must be maximum 15 digit number",
        "any.required": "Phone number is required"
      })
    })
  };
});
var _default = exports.default = new UserValidator();
//# sourceMappingURL=user-validator.js.map