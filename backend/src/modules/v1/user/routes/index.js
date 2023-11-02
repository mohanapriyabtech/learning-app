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

import userAuthentication from '../authentication/user-authentication';
import listCourse from '../../mentor/controllers/course-management/list-course';
import getCourseById from '../../mentor/controllers/course-management/get-course-by-id';
import deleteCourseById from '../../mentor/controllers/course-management/delete-course-by-id';
import createCourseController from '../../mentor/controllers/course-management/create-course-controller';
import updateCourseController from '../../admin/controllers/course-management/update-course-controller';
import listMentor from '../../mentor/controllers/mentor-management/list-mentor';
import getMentorById from '../../mentor/controllers/mentor-management/get-mentor-by-id';
import searchCourseController from '../../admin/controllers/course-management/search-course-controller';


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


//course management
userRouter.get('/list-course', listCourse.list);
userRouter.get('/list-mentor', listMentor.list);
userRouter.get('/get-course/:id', paramsValidator.validate, getCourseById.get);
userRouter.delete('/delete-course/:id', paramsValidator.validate,deleteCourseById.delete);
userRouter.post('/create-course', createCourseController.create);
userRouter.post('/edit-course/:id', updateCourseController.update);
userRouter.get('/search-course',searchCourseController.search);

//mentor management

userRouter.get('/get-mentor/:id', paramsValidator.validate, getMentorById.get);



module.exports = userRouter;