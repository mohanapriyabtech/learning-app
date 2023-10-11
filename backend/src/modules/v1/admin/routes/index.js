import express from 'express';
//validators
import paramsValidator from '../validators/params-validator';
import signupAdmin from '../controllers/admin-management/signup-admin';
import loginAdmin from '../controllers/admin-management/login-admin';
import getAdmin from '../controllers/admin-management/get-admin';
import listAdmin from '../controllers/admin-management/list-admin';
import updateAdmin from '../controllers/admin-management/update-admin';
import adminValidator from '../validators/admin-validator';
import deleteAdmin from '../controllers/admin-management/delete-admin';
import listUser from '../controllers/user-management/list-user';
import getUser from '../../user/controllers/user-management/get-user';
import deleteUser from '../controllers/user-management/delete-user';
import unblockUser from '../controllers/user-management/unblock-user';
import blockUser from '../controllers/user-management/block-user';
//import acceptKycDetails from '../controllers/user-management/accept-kyc-details';
import rejectKycDetails from '../controllers/user-management/reject-kyc-details';
import logout from '../../user/controllers/user-management/logout';
import listProjects from '../controllers/project-management /list-projects';
import getProjectById from '../controllers/project-management /get-project-by-id';
import deleteProjectById from '../controllers/project-management /delete-project-by-id';
import createMentor from '../controllers/mentor-management/create-mentor';
import deleteMentor from '../controllers/mentor-management/delete-mentor';
import listMentor from '../controllers/mentor-management/list-mentor';
import getMentorById from '../controllers/mentor-management/get-mentor-by-id';
import createCourseController from '../controllers/course-management/create-course-controller';
import deleteCourseById from '../controllers/course-management/delete-course-by-id';
import getCourseById from '../controllers/course-management/get-course-by-id';
import listCourse from '../controllers/course-management/list-course';
import createLessonController from '../controllers/lesson-management/create-lesson-controller';
import deleteLessonById from '../controllers/lesson-management/delete-lesson-by-id';
import getLessonById from '../controllers/lesson-management/get-lesson-by-id';
import listLesson from '../controllers/lesson-management/list-lesson';


const adminRouter = express.Router();

/**
 * admin routes
 * @description admin routes
 */

//admin management routes
adminRouter.post('/signup', adminValidator.signup, signupAdmin.create);
adminRouter.post('/login', adminValidator.login, loginAdmin.get);
adminRouter.get('/details/:id', paramsValidator.validate, getAdmin.get);
adminRouter.get('/list', listAdmin.list)
adminRouter.patch('/update/:id', paramsValidator.validate, adminValidator.update, updateAdmin.update)
adminRouter.delete('/delete/:id', paramsValidator.validate, deleteAdmin.delete)
adminRouter.delete('/logout', logout.delete);

//user management
adminRouter.get('/list-user', listUser.list);
adminRouter.get('/get-user/:id', paramsValidator.validate, getUser.get)
adminRouter.delete('/delete-user/:id', paramsValidator.validate, deleteUser.delete);
adminRouter.patch('/block-user/:id', paramsValidator.validate, blockUser.update);
adminRouter.patch('/unblock-user/:id', paramsValidator.validate, unblockUser.update);
//adminRouter.patch('/accept-user-kyc/:id', paramsValidator.validate, acceptKycDetails.update);
//adminRouter.patch('/reject-user-kyc/:id', paramsValidator.validate, rejectKycDetails.update);

// // project-management
// adminRouter.get('/list-project', listProjects.list);
// adminRouter.get('/get-user/:id', paramsValidator.validate, getProjectById.get)
// adminRouter.delete('/delete-user/:id', paramsValidator.validate, deleteProjectById.delete);


//mentor management
adminRouter.get('/list-mentor', listMentor.list);
adminRouter.get('/get-mentor/:id', paramsValidator.validate, getMentorById.get)
adminRouter.delete('/delete-mentor/:id', paramsValidator.validate, deleteMentor.delete);
adminRouter.post('/create-mentor', createMentor.create);

//course management
adminRouter.get('/list-course', listCourse.list);
adminRouter.get('/get-course/:id', paramsValidator.validate, getCourseById.get);
adminRouter.delete('/delete-course/:id', paramsValidator.validate,deleteCourseById.delete);
adminRouter.post('/create-course', createCourseController.create);

//lesson management
adminRouter.get('/list-lesson', listLesson.list);
adminRouter.get('/get-lesson/:id', paramsValidator.validate, getLessonById.get);
adminRouter.delete('/delete-lesson/:id', paramsValidator.validate,deleteLessonById.delete);
adminRouter.post('/create-lesson', createLessonController.create);

module.exports = adminRouter;