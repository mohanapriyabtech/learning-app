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
var _base = _interopRequireDefault(require("../config/base"));
var _routes = _interopRequireDefault(require("../modules/v1/user/routes"));
var _routes2 = _interopRequireDefault(require("../modules/v1/admin/routes"));
var _fileuploadRoutes = _interopRequireDefault(require("../modules/v1/file-upload/routes/fileupload-routes"));
var _responseHandler = require("../utils/response-handler");
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var RouteServiceProvider = exports.default = /*#__PURE__*/function (_BaseConfig) {
  (0, _inherits2.default)(RouteServiceProvider, _BaseConfig);
  var _super = _createSuper(RouteServiceProvider);
  function RouteServiceProvider() {
    var _this;
    (0, _classCallCheck2.default)(this, RouteServiceProvider);
    _this = _super.call(this);
    _this.loadRoutes();
    _this.routeNotFound();
    return _this;
  }

  /**
   * 
   * @param {*} route functions 
   */
  (0, _createClass2.default)(RouteServiceProvider, [{
    key: "loadRoutes",
    value: function loadRoutes() {
      this.app.get('/', function (req, res) {
        res.send('Application api working');
      });
      this.app.use('/api/v1/user', _routes.default);
      this.app.use('/api/v1/admin', _routes2.default);
      this.app.use('/api/v1/file-upload', _fileuploadRoutes.default);
    }
  }, {
    key: "routeNotFound",
    value: function routeNotFound() {
      this.app.use(function (req, res, next) {
        return _responseHandler.responseHandler.errorResponse(res, {}, 'Requested route not found', 404);
      });
    }
  }]);
  return RouteServiceProvider;
}(_base.default);
//# sourceMappingURL=route-service-provider.js.map