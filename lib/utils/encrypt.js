"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSession = exports.checkSession = void 0;
exports.decrypt = decrypt;
exports.encrypt = encrypt;
exports.logoutSession = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _crypto = _interopRequireDefault(require("crypto"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _sessionModel = require("../modules/v1/admin/models/session-model");
var ENCRYPTION_KEY = process.env.SC_ENCRYPTION_KEY || 'agdjhjdhfjdjshkjgfghnbjkggnhhnbv'; // Must be 256 bits (32 characters)
var IV_LENGTH = 16; // For AES, this is always 16

function encrypt(text) {
  var encryptionKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ENCRYPTION_KEY;
  var iv = Buffer.from(_crypto.default.randomBytes(IV_LENGTH)).toString('hex').slice(0, IV_LENGTH);
  console.log(iv, "-----------");
  var cipher = _crypto.default.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
  console.log(encryptionKey, "-----------");
  var encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv + ':' + encrypted.toString('hex');
}
function decrypt(text) {
  var encryptionKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ENCRYPTION_KEY;
  try {
    var textParts = text.includes(':') ? text.split(':') : [];
    console.log(text, ENCRYPTION_KEY, textParts);
    var iv = Buffer.from(textParts.shift() || '', 'binary');
    console.log(iv, "------");
    var encryptedText = Buffer.from(textParts.join(':'), 'hex');
    var decipher = _crypto.default.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
    var decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (error) {
    if (error) {
      console.log(error.message);
      console.log("error in decrypt");
    }
  }
}
var createSession = exports.createSession = function createSession(user, device) {
  return new Promise(function (resolve, reject) {
    var tokenParams = {
      id: user._id,
      email: user.email,
      name: user.name,
      time: new Date().valueOf()
    };
    if (device) {
      tokenParams.device_information = device;
    }
    checkSession(user._id);
    var sessionParam = {
      session_token: _jsonwebtoken.default.sign(tokenParams, process.env.SECRET_KEY),
      user_id: user._id
    };
    var session = new _sessionModel.Session(sessionParam);
    session.save().then(function (_session) {
      resolve(_session);
    }).catch(function (error) {
      reject(error.message);
    });
  });
};

/**
* update user details
* @returns Promise<error | user>
*/
var logoutSession = exports.logoutSession = function logoutSession(session) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve, reject) {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            session = session.split(' ');
            _sessionModel.Session.findOneAndDelete({
              session_token: session
            }).then(function (session) {
              resolve(session);
            }).catch(function (error) {
              reject(error.message);
            });
          case 2:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

/**
* check user session
* @returns Promise<error | user>
*/
var checkSession = exports.checkSession = function checkSession(id) {
  return new Promise(function (resolve, reject) {
    try {
      _sessionModel.Session.find({
        user_id: id
      }).then( /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(result) {
          return _regenerator.default.wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                if (!(result.length > 50)) {
                  _context2.next = 3;
                  break;
                }
                _context2.next = 3;
                return _sessionModel.Session.deleteMany({
                  user_id: id
                });
              case 3:
                resolve('sucess');
              case 4:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }));
        return function (_x3) {
          return _ref2.apply(this, arguments);
        };
      }()).catch(function (error) {
        reject(error.message);
      });
    } catch (err) {
      reject(err);
    }
  });
};
//# sourceMappingURL=encrypt.js.map