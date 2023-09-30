"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _base = _interopRequireDefault(require("./base"));
var _chalk = _interopRequireDefault(require("chalk"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
/**
 * Mongoose configuration class to connect mongodb using Mongoose
 */
var Mongoose = exports.default = /*#__PURE__*/function (_BaseConfig) {
  (0, _inherits2.default)(Mongoose, _BaseConfig);
  var _super = _createSuper(Mongoose);
  function Mongoose() {
    (0, _classCallCheck2.default)(this, Mongoose);
    return _super.call(this);
  }
  /**
   * connection to mongoDB
   */
  (0, _createClass2.default)(Mongoose, [{
    key: "connectDB",
    value: function connectDB() {
      // this.mongoose.connect(this.ENV.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

      if (this.ENV.MONGODB_PASSWORD == undefined || this.ENV.MONGODB_PASSWORD == '') {
        console.log('Mongodb Connecting without password');
        console.log("mongodb://".concat(this.ENV.HOST, "/").concat(this.ENV.MONGODB_DB_NAME));
        this.mongoose.connect("mongodb://".concat(this.ENV.HOST, "/").concat(this.ENV.MONGODB_DB_NAME), {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
      } else {
        console.log('Mongodb Connecting with password');
        var URI = "mongodb://".concat(this.ENV.MONGODB_USERNAME, ":").concat(this.ENV.MONGODB_PASSWORD, "@").concat(this.ENV.MONGODB_HOST, ":").concat(this.ENV.MONGODB_PORT, "/").concat(this.ENV.MONGODB_DB_NAME, "?authMechanism=DEFAULT&authSource=admin");
        console.log("connecting....");
        this.mongoose.connect(URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
      }
      // when successfully connected
      this.mongoose.connection.on('connected', function () {
        console.log(_chalk.default.yellowBright.bold.italic('Mongodb successfully connected'));
      });
      // if the connection throws an error
      this.mongoose.connection.on("error", function (err) {
        // if you get error for the first time when this gets started make sure to run mongodb
        console.log('Mongodb connection failed', err);
      });
      // when the connection is disconnected
      this.mongoose.connection.on("disconnected", function () {
        console.log(_chalk.default.red.bold.italic('Mongodb disconnected'));
      });
    }
  }]);
  return Mongoose;
}(_base.default);
//# sourceMappingURL=mongoose.js.map