"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _express = _interopRequireDefault(require("./express"));
var _sequelize = require("sequelize");
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
// Basic configuration 
var BaseConfig = exports.default = /*#__PURE__*/function (_Express) {
  (0, _inherits2.default)(BaseConfig, _Express);
  var _super = _createSuper(BaseConfig);
  function BaseConfig() {
    var _this;
    (0, _classCallCheck2.default)(this, BaseConfig);
    _this = _super.call(this);
    //set mongoose
    _this.mongoose = _mongoose.default;
    //set environment variables
    _this.ENV = _dotenv.default.config().parsed;
    //connecting seqalize for other sql db's
    // this.sequelize = new Sequelize({
    //     database: this.ENV.SQL_DB_NAME,
    //     username: this.ENV.SQL_USERNAME,
    //     password: this.ENV.SQL_PASSWORD,
    //     host: this.ENV.SQL_HOST,
    //     port: this.ENV.SQL_PORT,
    //     dialect: this.ENV.SQL_DB,
    //     logging: false
    // });
    return _this;
  }
  return (0, _createClass2.default)(BaseConfig);
}(_express.default);
//# sourceMappingURL=base.js.map