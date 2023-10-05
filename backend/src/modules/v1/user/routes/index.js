import express from 'express';
import signUpUser from '../controllers/user-management/sign-up-user';
import loginUser from '../controllers/user-management/login-user';
import updateUser from '../controllers/user-management/update-user';
import getUser from '../controllers/user-management/get-user';
import sendVerificationLink from '../controllers/user-management/send-verification-link';
import sendForgetPasswordLink from '../controllers/user-management/send-forget-password-link';
import verifyEmail from '../controllers/user-management/verify-email';
import paramsValidator from '../../admin/validators/params-validator';
import userValidator from '../validators/user-validator';
import resetPassword from '../controllers/user-management/reset-password';
import logout from '../controllers/user-management/logout';
import createProjectController from '../controllers/project-management /create-project-controller';
import getProjectById from '../../admin/controllers/project-management /get-project-by-id';
import updateProjectController from '../controllers/project-management /update-project-controller';
import deleteProjectById from '../controllers/project-management /delete-project-by-id';
import listProjects from '../controllers/project-management /list-projects';
import userAuthentication from '../authentication/user-authentication';


const userRouter = express.Router();

/**
 * user routes
 * @description user routes
 */

//user routes
userRouter.post('/signup', signUpUser.create);
userRouter.post('/login', userValidator.login, loginUser.get);
userRouter.get('/send-verification-mail', sendVerificationLink.update);
userRouter.get('/send-forgot-password-mail', sendForgetPasswordLink.update);
userRouter.patch('/verify-email/:id', paramsValidator.validate, verifyEmail.update);
userRouter.patch('/update/:id', paramsValidator.validate, userValidator.update,userAuthentication.check, updateUser.update);
userRouter.get('/details/:id', paramsValidator.validate, userAuthentication.check,getUser.get);
userRouter.patch('/reset-password/:id', paramsValidator.validate,userAuthentication.check, resetPassword.update);
userRouter.delete('/logout', userAuthentication.check,logout.delete);

// project management

userRouter.post('/create-project', userAuthentication.check,createProjectController.create);
userRouter.get('/list-project', userAuthentication.check,listProjects.list);  
userRouter.get('/get-project/:id',userAuthentication.check, getProjectById.get);
userRouter.patch('/update-project/:id', userAuthentication.check,updateProjectController.update);
userRouter.delete('/delete-project/:id',userAuthentication.check, deleteProjectById.delete);



module.exports = userRouter;