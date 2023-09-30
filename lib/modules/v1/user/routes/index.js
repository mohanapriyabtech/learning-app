"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = _interopRequireDefault(require("express"));
var _signUpUser = _interopRequireDefault(require("../controllers/user-management/sign-up-user"));
var _loginUser = _interopRequireDefault(require("../controllers/user-management/login-user"));
var _updateUser = _interopRequireDefault(require("../controllers/user-management/update-user"));
var _getUser = _interopRequireDefault(require("../controllers/user-management/get-user"));
var _sendVerificationLink = _interopRequireDefault(require("../controllers/user-management/send-verification-link"));
var _sendForgetPasswordLink = _interopRequireDefault(require("../controllers/user-management/send-forget-password-link"));
var _verifyEmail = _interopRequireDefault(require("../controllers/user-management/verify-email"));
var _paramsValidator = _interopRequireDefault(require("../../admin/validators/params-validator"));
var _userValidator = _interopRequireDefault(require("../validators/user-validator"));
var _resetPassword = _interopRequireDefault(require("../controllers/user-management/reset-password"));
var _logout = _interopRequireDefault(require("../controllers/user-management/logout"));
var _createProjectController = _interopRequireDefault(require("../controllers/project-management /create-project-controller"));
var _getProjectById = _interopRequireDefault(require("../../admin/controllers/project-management /get-project-by-id"));
var _updateProjectController = _interopRequireDefault(require("../controllers/project-management /update-project-controller"));
var _deleteProjectById = _interopRequireDefault(require("../controllers/project-management /delete-project-by-id"));
var _listProjects = _interopRequireDefault(require("../controllers/project-management /list-projects"));
var _userAuthentication = _interopRequireDefault(require("../authentication/user-authentication"));
var userRouter = _express.default.Router();

/**
 * user routes
 * @description user routes
 */

//user routes
userRouter.post('/signup', _signUpUser.default.create);
userRouter.post('/login', _userValidator.default.login, _loginUser.default.get);
userRouter.get('/send-verification-mail', _sendVerificationLink.default.update);
userRouter.get('/send-forgot-password-mail', _sendForgetPasswordLink.default.update);
userRouter.patch('/verify-email/:id', _paramsValidator.default.validate, _verifyEmail.default.update);
userRouter.patch('/update/:id', _paramsValidator.default.validate, _userValidator.default.update, _userAuthentication.default.check, _updateUser.default.update);
userRouter.get('/details/:id', _paramsValidator.default.validate, _userAuthentication.default.check, _getUser.default.get);
userRouter.patch('/reset-password/:id', _paramsValidator.default.validate, _userAuthentication.default.check, _resetPassword.default.update);
userRouter.delete('/logout', _userAuthentication.default.check, _logout.default.delete);

// project management

userRouter.post('/create-project', _userAuthentication.default.check, _createProjectController.default.create);
userRouter.get('/list-project', _userAuthentication.default.check, _listProjects.default.list);
userRouter.get('/get-project/:id', _userAuthentication.default.check, _getProjectById.default.get);
userRouter.patch('/update-project/:id', _userAuthentication.default.check, _updateProjectController.default.update);
userRouter.delete('/delete-project/:id', _userAuthentication.default.check, _deleteProjectById.default.delete);
module.exports = userRouter;
//# sourceMappingURL=index.js.map