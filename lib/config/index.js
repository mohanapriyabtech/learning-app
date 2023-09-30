"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _base = _interopRequireDefault(require("./base"));
var _dbBackup = _interopRequireDefault(require("./dbBackup"));
var _mongoose = _interopRequireDefault(require("./mongoose"));
//basic env and express config
var config = new _base.default();
//base mongoose config
var mongoose = new _mongoose.default();
//db backup config
var backup = new _dbBackup.default();
module.exports = {
  config: config,
  mongoose: mongoose,
  backup: backup
};
//# sourceMappingURL=index.js.map