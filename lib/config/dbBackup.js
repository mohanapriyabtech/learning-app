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
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _base = _interopRequireDefault(require("./base"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var path = require('path');
var cron = require('node-cron');
var fs = require("fs");
var fsPromises = require("fs").promises;
var _require = require("child_process"),
  spawn = _require.spawn;
var dbBackup = exports.default = /*#__PURE__*/function (_BaseConfig) {
  (0, _inherits2.default)(dbBackup, _BaseConfig);
  var _super = _createSuper(dbBackup);
  function dbBackup() {
    (0, _classCallCheck2.default)(this, dbBackup);
    return _super.call(this);
  }
  (0, _createClass2.default)(dbBackup, [{
    key: "dataBackup",
    value: function () {
      var _dataBackup = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var _this = this;
        var dbName, archivePath;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              dbName = this.ENV.MONGODB_DB_NAME;
              archivePath = path.join('dbBackUp'); // if Directory Not exist make Directory 
              if (fs.existsSync(path.join(process.cwd(), "dbBackUp"))) {
                _context.next = 5;
                break;
              }
              _context.next = 5;
              return fsPromises.mkdir(path.join(process.cwd(), "dbBackUp"));
            case 5:
              // Scheduling the backup  (using node-cron)
              cron.schedule('0 0 * * *', function () {
                console.log("start");
                // var cmd = 'mongodump --host ' + this.ENV.MONGODB_HOST + ' --port ' + this.ENV.MONGODB_PORT + ' --db ' + this.ENV.MONGODB_DB_NAME + ' --username ' + this.ENV.MONGODB_USERNAME + ' --password ' + this.ENV.MONGODB_PASSWORD + ' --out ' + '--archive=' + archivePath; // Command for mongodb dump process
                console.log('mongodump --host ' + _this.ENV.MONGODB_HOST + ' --port ' + _this.ENV.MONGODB_PORT + ' --db ' + _this.ENV.MONGODB_DB_NAME + ' --username ' + _this.ENV.MONGODB_USERNAME + ' --password ' + _this.ENV.MONGODB_PASSWORD + ' --out ' + '--archive=' + archivePath);
                var child = spawn('mongodump', ["--host=".concat(_this.ENV.MONGODB_HOST), "--port=".concat(_this.ENV.MONGODB_PORT), "--db=".concat(_this.ENV.MONGODB_DB_NAME), "--username=".concat(_this.ENV.MONGODB_USERNAME), "--password=".concat(_this.ENV.MONGODB_PASSWORD), // '--out' ,
                "--archive=".concat(archivePath), '--gzip']);
                child.stdout.on('data', function (data) {
                  console.log('stdout:\n', data);
                });
                child.stderr.on('data', function (data) {
                  console.log('stderr:\n', Buffer.from(data).toString());
                });
                child.on('error', function (error) {
                  console.log('error:\n', error);
                });
                child.on('exit', function (code, signal) {
                  if (code) console.log('Process exit with code:', code);else if (signal) console.log('Process killed with signal:', signal);else console.log('Database Backup successfully...');
                });
              });
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function dataBackup() {
        return _dataBackup.apply(this, arguments);
      }
      return dataBackup;
    }()
  }]);
  return dbBackup;
}(_base.default);
//# sourceMappingURL=dbBackup.js.map