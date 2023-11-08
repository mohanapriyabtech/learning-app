import express from 'express';
//validators
import paramsValidator from '../validators/params-validator';
//import acceptKycDetails from '../controllers/user-management/accept-kyc-details';
import rejectKycDetails from '../controllers/user-management/reject-kyc-details';
import logout from '../../user/controllers/user-management/logout';
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
import signupMentor from '../controllers/mentor-management/signup-mentor';
import loginMentor from '../controllers/mentor-management/login-mentor';
import updateMentor from '../controllers/mentor-management/update-mentor';
import mentorAuthentication from '../authentication/mentor-authentication';
import mentorValidator from '../validators/mentor-validator';
import searchCourseController from '../../admin/controllers/course-management/search-course-controller';
import updateCourseController from '../../admin/controllers/course-management/update-course-controller';
import searchMentor from '../controllers/mentor-management/search-mentor';
import lessonGetByMentorController from '../controllers/lesson-management/lesson-get-by-mentor-controller';
import lessonGetByCourseController from '../controllers/lesson-management/lesson-get-by-course-controller';
import getCourseByMentor from '../controllers/course-management/get-course-by-mentor';
import searchLessonController from '../controllers/lesson-management/search-lesson-controller';
import getCourseByCategory from '../controllers/course-management/get-course-by-category';


const mentorRouter = express.Router();

/**
 * admin routes
 * @description admin routes
 */

//mentor management
mentorRouter.post('/signup',mentorValidator.signup,signupMentor.create);
mentorRouter.post('/login', loginMentor.get);
mentorRouter.get('/list-mentor', listMentor.list);
mentorRouter.get('/get-mentor/:id', paramsValidator.validate, getMentorById.get)
mentorRouter.delete('/delete-mentor/:id', paramsValidator.validate, deleteMentor.delete);
mentorRouter.patch('/update-mentor/:id', paramsValidator.validate, updateMentor.update);
mentorRouter.get('/search-mentor',searchMentor.search);

//course management
mentorRouter.get('/list-course', listCourse.list);
mentorRouter.get('/get-course/:id', paramsValidator.validate, getCourseById.get);
mentorRouter.delete('/delete-course/:id', paramsValidator.validate,deleteCourseById.delete);
mentorRouter.post('/create-course', mentorAuthentication.check,createCourseController.create);
mentorRouter.get('/search-course',searchCourseController.search);
mentorRouter.patch('/edit-course/:id',updateCourseController.update);
mentorRouter.get('/get-course-by-mentor/:mentorId',getCourseByMentor.get);
mentorRouter.get('/get-course-by-category/:categoryId',getCourseByCategory.get);


//lesson management
mentorRouter.get('/list-lesson', listLesson.list);
mentorRouter.get('/get-lesson/:id', paramsValidator.validate, getLessonById.get);
mentorRouter.delete('/delete-lesson/:id', paramsValidator.validate,deleteLessonById.delete);
mentorRouter.post('/create-lesson', createLessonController.create);
mentorRouter.get('/get-lesson-by-mentor/:mentorId', lessonGetByMentorController.get);
mentorRouter.get('/get-lesson-by-course/:courseId', lessonGetByCourseController.get);
mentorRouter.get('/search-lesson',searchLessonController.search);

module.exports = mentorRouter;