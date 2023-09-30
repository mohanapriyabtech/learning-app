"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Project = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));
var Schema = _mongoose.default.Schema;
var ObjectId = Schema.ObjectId;

/**
 * Project Schema
 * @description Project model
 */

var ProjectSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name must not be empty'],
    unique: true
  },
  description: {
    type: String,
    required: [true, 'description must not be empty']
  },
  user_id: {
    type: ObjectId,
    ref: "User"
  },
  file_url: {
    type: String,
    required: [true, 'file must not be empty']
  },
  api_key: {
    type: String
  },
  status: {
    type: Boolean,
    default: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false,
  timestamps: false
});
ProjectSchema.plugin(_mongoosePaginateV.default);
ProjectSchema.index({
  name: 'text'
});
var Project = exports.Project = _mongoose.default.model('Project', ProjectSchema);
//# sourceMappingURL=project-model.js.map