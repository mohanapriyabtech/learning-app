"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = _interopRequireDefault(require("express"));
var _paramsValidator = _interopRequireDefault(require("../validators/params-validator"));
var _signupAdmin = _interopRequireDefault(require("../controllers/admin-management/signup-admin"));
var _loginAdmin = _interopRequireDefault(require("../controllers/admin-management/login-admin"));
var _getAdmin = _interopRequireDefault(require("../controllers/admin-management/get-admin"));
var _listAdmin = _interopRequireDefault(require("../controllers/admin-management/list-admin"));
var _updateAdmin = _interopRequireDefault(require("../controllers/admin-management/update-admin"));
var _adminValidator = _interopRequireDefault(require("../validators/admin-validator"));
var _deleteAdmin = _interopRequireDefault(require("../controllers/admin-management/delete-admin"));
var _listUser = _interopRequireDefault(require("../controllers/user-management/list-user"));
var _getUser = _interopRequireDefault(require("../../user/controllers/user-management/get-user"));
var _deleteUser = _interopRequireDefault(require("../controllers/user-management/delete-user"));
var _unblockUser = _interopRequireDefault(require("../controllers/user-management/unblock-user"));
var _blockUser = _interopRequireDefault(require("../controllers/user-management/block-user"));
var _rejectKycDetails = _interopRequireDefault(require("../controllers/user-management/reject-kyc-details"));
var _logout = _interopRequireDefault(require("../../user/controllers/user-management/logout"));
var _listProjects = _interopRequireDefault(require("../controllers/project-management /list-projects"));
var _getProjectById = _interopRequireDefault(require("../controllers/project-management /get-project-by-id"));
var _deleteProjectById = _interopRequireDefault(require("../controllers/project-management /delete-project-by-id"));
//validators

//import acceptKycDetails from '../controllers/user-management/accept-kyc-details';

var adminRouter = _express.default.Router();

/**
 * admin routes
 * @description admin routes
 */

//admin management routes
adminRouter.post('/signup', _adminValidator.default.signup, _signupAdmin.default.create);
adminRouter.post('/login', _adminValidator.default.login, _loginAdmin.default.get);
adminRouter.get('/details/:id', _paramsValidator.default.validate, _getAdmin.default.get);
adminRouter.get('/list', _listAdmin.default.list);
adminRouter.patch('/update/:id', _paramsValidator.default.validate, _adminValidator.default.update, _updateAdmin.default.update);
adminRouter.delete('/delete/:id', _paramsValidator.default.validate, _deleteAdmin.default.delete);
adminRouter.delete('/logout', _logout.default.delete);

//user management
adminRouter.get('/list-user', _listUser.default.list);
adminRouter.get('/get-user/:id', _paramsValidator.default.validate, _getUser.default.get);
adminRouter.delete('/delete-user/:id', _paramsValidator.default.validate, _deleteUser.default.delete);
adminRouter.patch('/block-user/:id', _paramsValidator.default.validate, _blockUser.default.update);
adminRouter.patch('/unblock-user/:id', _paramsValidator.default.validate, _unblockUser.default.update);
//adminRouter.patch('/accept-user-kyc/:id', paramsValidator.validate, acceptKycDetails.update);
//adminRouter.patch('/reject-user-kyc/:id', paramsValidator.validate, rejectKycDetails.update);

// project-management
adminRouter.get('/list-project', _listProjects.default.list);
adminRouter.get('/get-user/:id', _paramsValidator.default.validate, _getProjectById.default.get);
adminRouter.delete('/delete-user/:id', _paramsValidator.default.validate, _deleteProjectById.default.delete);
module.exports = adminRouter;
//# sourceMappingURL=index.js.map