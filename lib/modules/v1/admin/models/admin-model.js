"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Admin = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));
var Schema = _mongoose.default.Schema;

/**
 * AdminSchema
 * @description Admin model
 */

var AdminSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name must not be empty']
  },
  email: {
    type: String,
    required: [true, 'email must not be empty'],
    unique: true
  },
  is_primary: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: [true, 'password must not be empty']
  },
  phone_number: {
    type: Number,
    unique: true
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

// AdminSchema.plugin(mongoosePaginate);

// AdminSchema.index({ name: 'text' });

var Admin = exports.Admin = _mongoose.default.model('admin', AdminSchema);
//# sourceMappingURL=admin-model.js.map