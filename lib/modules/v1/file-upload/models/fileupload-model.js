"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.File = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));
var Schema = _mongoose.default.Schema;
var ObjectId = Schema.ObjectId;

/**
 * File Upload Schema
 * @description FileUpload model
 */
var FileUploadSchema = new Schema({
  file: {
    type: String,
    required: true
  },
  file_type: {
    type: String,
    required: true
  },
  service_type: {
    type: String,
    required: true
  },
  resized_image: {
    type: Array
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: false
});
var File = exports.File = _mongoose.default.model('File', FileUploadSchema);
//# sourceMappingURL=fileupload-model.js.map