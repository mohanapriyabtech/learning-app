"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));
var Schema = _mongoose.default.Schema;
var ObjectId = Schema.ObjectId;

/**
 * UserSchema
 * @description User model
 */

var UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name must not be empty']
  },
  email: {
    type: String,
    required: [true, 'email must not be empty'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'password must not be empty']
  },
  // phone_number: {
  //     type: Number,
  //     required: [true, 'phone_number must not be empty'],
  //     unique: true
  // },
  email_verified: {
    type: Number,
    default: 0
  },
  reset_token: {
    type: String
  },
  token_expires: {
    type: String
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

// UserSchema.plugin(mongoosePaginate);

// UserSchema.index({ name: 'text' });

var User = exports.User = _mongoose.default.model('User', UserSchema);
//# sourceMappingURL=user-model.js.map