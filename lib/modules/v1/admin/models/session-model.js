"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Session = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var Schema = _mongoose.default.Schema;
var ObjectId = Schema.ObjectId;

/**
 * User schema
 */

var SessionSchema = new Schema({
  user_id: {
    type: ObjectId,
    required: true
  },
  session_token: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    default: 1
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});
var Session = exports.Session = _mongoose.default.model('session', SessionSchema);
//# sourceMappingURL=session-model.js.map