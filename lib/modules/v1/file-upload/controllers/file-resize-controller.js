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
var _responseHandler = require("../../../../utils/response-handler");
var _sharp = _interopRequireDefault(require("sharp"));
var _fs = _interopRequireDefault(require("fs"));
var _fileuploadModel = require("../models/fileupload-model");
var FileResizeController = /*#__PURE__*/function () {
  function FileResizeController() {
    (0, _classCallCheck2.default)(this, FileResizeController);
  }

  /**
   * @description  API for File resize
   * @param {*} req 
   * @param {*} res 
   */
  (0, _createClass2.default)(FileResizeController, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
        var requiredWidth, requiredHeight, imageFolderName, imagePath, image, metadata, aspectRatio, width, height, directoryPath, fileName, extension, nameWithoutExtension, newName, uploadPath, data;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              requiredWidth = req.body.width;
              requiredHeight = req.body.height;
              imageFolderName = new Date().valueOf();
              imagePath = "/var/www/html/".concat(req.body.image.split("".concat(process.env.MONGODB_HOST, "/"))[1]);
              image = (0, _sharp.default)(imagePath); // get the image metadata to determine the image dimensions
              _context.next = 8;
              return image.metadata();
            case 8:
              metadata = _context.sent;
              // calculate the aspect ratio of the original image
              aspectRatio = metadata.width / metadata.height; // calculate the width and height of the resized image while maintaining the aspect ratio
              width = aspectRatio >= 1 ? requiredWidth : Math.round(requiredHeight * aspectRatio);
              height = aspectRatio >= 1 ? Math.round(requiredWidth / aspectRatio) : requiredHeight;
              directoryPath = "/var/www/html/".concat(process.env.UPLOADS_PATH, "/resized-images/").concat(imageFolderName);
              if (!_fs.default.existsSync(directoryPath)) {
                _fs.default.mkdirSync(directoryPath, {
                  recursive: true
                });
              }
              fileName = imagePath.split('/').pop();
              extension = fileName.split('.').pop();
              nameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.'));
              newName = "".concat(nameWithoutExtension, "(").concat(requiredWidth, "x").concat(requiredHeight, ").").concat(extension);
              uploadPath = "".concat(directoryPath, "/").concat(newName); // resize and compress the image
              _context.next = 21;
              return image.resize(width, height, {
                fit: 'inside'
              }).jpeg({
                quality: 80
              }).toFile(uploadPath);
            case 21:
              data = {
                resized_image: "http://".concat(process.env.MONGODB_HOST, "/").concat(process.env.UPLOADS_PATH, "/resized-images/").concat(imageFolderName, "/").concat(newName)
              };
              _context.next = 24;
              return updateFile(req.body.image, data.resized_image);
            case 24:
              return _context.abrupt("return", _responseHandler.responseHandler.successResponse(res, data, 'Image resized successfully'));
            case 27:
              _context.prev = 27;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, _context.t0));
            case 31:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 27]]);
      }));
      function create(_x, _x2) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
  }]);
  return FileResizeController;
}();
var _default = exports.default = new FileResizeController();
var updateFile = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(actual, resized) {
    var result;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _fileuploadModel.File.findOneAndUpdate({
            file: actual
          }, {
            $addToSet: {
              resized_image: [resized]
            }
          });
        case 3:
          result = _context2.sent;
          return _context2.abrupt("return", result);
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          throw _context2.t0;
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function updateFile(_x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=file-resize-controller.js.map