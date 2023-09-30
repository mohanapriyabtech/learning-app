"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = _interopRequireDefault(require("express"));
var _fileUploadController = _interopRequireDefault(require("../controllers/file-upload-controller"));
var _fileRemoveController = _interopRequireDefault(require("../controllers/file-remove-controller"));
var _fileResizeController = _interopRequireDefault(require("../controllers/file-resize-controller"));
var fileRouter = _express.default.Router();

/**
 * file routes
 * @description file routes
 */

fileRouter.post('/upload', _fileUploadController.default.create);
fileRouter.post('/resize', _fileResizeController.default.create);
fileRouter.delete('/remove', _fileRemoveController.default.delete);
module.exports = fileRouter;
//# sourceMappingURL=fileupload-routes.js.map