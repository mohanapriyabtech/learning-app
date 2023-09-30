"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.limiter = exports.default = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _cors = _interopRequireDefault(require("cors"));
var _xssClean = _interopRequireDefault(require("xss-clean"));
var _express = _interopRequireDefault(require("express"));
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));
var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));
/**
 * cors middleware options
 * @param {*} req 
 * @param {*} callback 
 */
var corsOptions = {
  origin: function origin(_origin, callback) {
    if (process.env.WHITE_LISTED_DOMAINS.split(',').indexOf(_origin) !== -1) {
      console.log(process.env.WHITE_LISTED_DOMAINS.split(',').indexOf(_origin) !== -1);
      callback(null, true);
    } else {
      console.log("no");
      callback(new Error('Not allowed by CORS'));
    }
  }
};
var limiter = exports.limiter = (0, _expressRateLimit.default)({
  windowMs: 1 * 60 * 1000,
  // 1 minute
  max: 200,
  // Limit each IP to 100 requests per `window` (here, per 1 minute)
  // message:'Too many accounts created from this IP, please try again after an hour',
  standardHeaders: true,
  // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false // Disable the `X-RateLimit-*` headers
});
var Express = exports.default = /*#__PURE__*/(0, _createClass2.default)(function Express() {
  (0, _classCallCheck2.default)(this, Express);
  this.express = _express.default;
  this.app = new _express.default();
  // sanitize request data
  this.app.use((0, _xssClean.default)());
  this.app.use((0, _cors.default)(corsOptions));
  // parse urlencoded request body
  this.app.use(this.express.urlencoded({
    limit: '50mb',
    extended: true
  }));
  // parse response body
  this.app.use(this.express.json({
    limit: '50mb'
  }));
  // to handle uploading files
  this.app.use((0, _expressFileupload.default)({
    createParentPath: true
  }));
  this.app.use(limiter);
  // error handling middleware
  this.app.use(function (err, req, res, next) {
    if (err.message === 'Not allowed by CORS') {
      res.status(403).json({
        status: false,
        statusCode: 403,
        message: 'please visit our official website'
      });
    } else {
      next(err);
    }
  });
});
//# sourceMappingURL=express.js.map