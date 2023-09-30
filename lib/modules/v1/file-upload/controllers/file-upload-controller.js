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
var _fileuploadModel = require("../models/fileupload-model");
var FileUpload = /*#__PURE__*/function () {
  function FileUpload() {
    (0, _classCallCheck2.default)(this, FileUpload);
  }
  (0, _createClass2.default)(FileUpload, [{
    key: "create",
    value:
    /**
     * @description API for File upload
     * @param {*} req
     * @param {*} res
     */
    function () {
      var _create = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(req, res) {
        var files, _req$body$service, service, fileUploads, uploadedFiles;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              files = req.files, _req$body$service = req.body.service, service = _req$body$service === void 0 ? '' : _req$body$service;
              if (!(!files || Object.keys(files).length === 0)) {
                _context2.next = 4;
                break;
              }
              return _context2.abrupt("return", _responseHandler.responseHandler.errorResponse(res, {}, 'No files were uploaded.', 400));
            case 4:
              if (service) {
                _context2.next = 6;
                break;
              }
              return _context2.abrupt("return", _responseHandler.responseHandler.errorResponse(res, {}, 'Service field is required', 400));
            case 6:
              fileUploads = Array.isArray(files.media) ? files.media : [files.media];
              _context2.next = 9;
              return Promise.all(fileUploads.map( /*#__PURE__*/function () {
                var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(file) {
                  var fileType, name, imageFolderName, uploadPath, url;
                  return _regenerator.default.wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        fileType = getFileType(file.mimetype.split('/')[1]);
                        if (!(fileType === 0)) {
                          _context.next = 3;
                          break;
                        }
                        return _context.abrupt("return", _responseHandler.responseHandler.errorResponse(res, {}, "File type \"".concat(file.mimetype, "\" is not supported."), 400));
                      case 3:
                        name = "".concat(file.md5).concat(Date.now(), ".").concat(file.name.split(".").pop());
                        imageFolderName = new Date().valueOf();
                        uploadPath = "/var/www/html/".concat(process.env.UPLOADS_PATH, "/").concat(service, "/").concat(imageFolderName, "/").concat(name);
                        _context.next = 8;
                        return file.mv(uploadPath);
                      case 8:
                        url = "http://".concat(process.env.MONGODB_HOST, "/").concat(process.env.UPLOADS_PATH, "/").concat(service, "/").concat(imageFolderName, "/").concat(name);
                        _context.next = 11;
                        return storeFile(url, fileType, service);
                      case 11:
                        return _context.abrupt("return", {
                          name: file.name,
                          url: url
                        });
                      case 12:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));
                return function (_x3) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 9:
              uploadedFiles = _context2.sent;
              return _context2.abrupt("return", _responseHandler.responseHandler.successResponse(res, uploadedFiles, 'Files uploaded successfully'));
            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);
              return _context2.abrupt("return", _responseHandler.responseHandler.errorResponse(res, _context2.t0));
            case 17:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 13]]);
      }));
      function create(_x, _x2) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
  }]);
  return FileUpload;
}();
var getFileType = function getFileType(extension) {
  switch (extension) {
    case 'jpg':
    case 'png':
    case 'jpeg':
    case 'gif':
    case 'heic':
      return 'image';
    case 'mp3':
    case 'wav':
    case 'wave':
    case 'x-wav':
    case 'x-m4a':
      return 'audio';
    case 'mp4':
    case 'mov':
    case 'MOV':
      return 'video';
    case 'pdf':
    case 'doc':
    case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
    case 'msword':
      return 'file';
    default:
      return 0;
  }
};
var storeFile = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(file, fileType, service) {
    var fileModel, result;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          fileModel = new _fileuploadModel.File({
            file: file,
            file_type: fileType,
            service_type: service
          });
          _context3.prev = 1;
          _context3.next = 4;
          return fileModel.save();
        case 4:
          result = _context3.sent;
          return _context3.abrupt("return", result);
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          throw _context3.t0;
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 8]]);
  }));
  return function storeFile(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var _default = exports.default = new FileUpload();
//# sourceMappingURL=file-upload-controller.js.map