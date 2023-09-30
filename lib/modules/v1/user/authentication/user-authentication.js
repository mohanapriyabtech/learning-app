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
var _sessionModel = require("../../admin/models/session-model");
var _passport = _interopRequireDefault(require("passport"));
var _passportJwt = require("passport-jwt");
var _userModel = require("../models/user-model");
var UserAuthentication = /*#__PURE__*/function () {
  function UserAuthentication() {
    (0, _classCallCheck2.default)(this, UserAuthentication);
    this.secretKey = process.env.SECRET_KEY;

    // Configure Passport to use JWT strategy
    var opts = {
      jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: this.secretKey
    };
    _passport.default.use('user-jwt', new _passportJwt.Strategy(opts, /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(jwtPayload, done) {
        var user;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _userModel.User.findById(jwtPayload.id);
            case 3:
              user = _context.sent;
              if (!user) {
                _context.next = 8;
                break;
              }
              return _context.abrupt("return", done(null, user));
            case 8:
              return _context.abrupt("return", done(null, false));
            case 9:
              _context.next = 14;
              break;
            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", done(_context.t0, false));
            case 14:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 11]]);
      }));
      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }()));
  }
  (0, _createClass2.default)(UserAuthentication, [{
    key: "check",
    value: function () {
      var _check = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(req, res, next) {
        var token, session;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              token = req.headers.authorization;
              _context2.next = 3;
              return _sessionModel.Session.findOne({
                session_token: token.split(' ')[1],
                status: 1
              }).exec();
            case 3:
              session = _context2.sent;
              if (session) {
                _context2.next = 6;
                break;
              }
              return _context2.abrupt("return", _responseHandler.responseHandler.errorResponse(res, {}, "Invalid or expired session token", 401));
            case 6:
              _passport.default.authenticate('user-jwt', {
                session: false
              }, function (err, user) {
                if (err) {
                  return next(err);
                }
                if (!user) {
                  return _responseHandler.responseHandler.errorResponse(res, {}, 'authentication failed', 401);
                }
                req.user = user;
                next();
              })(req, res, next);
            case 7:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function check(_x3, _x4, _x5) {
        return _check.apply(this, arguments);
      }
      return check;
    }()
  }]);
  return UserAuthentication;
}();
var _default = exports.default = new UserAuthentication();
//# sourceMappingURL=user-authentication.js.map