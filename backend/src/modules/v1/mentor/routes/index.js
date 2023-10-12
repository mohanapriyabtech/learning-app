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


const mentorRouter = express.Router();

/**
 * admin routes
 * @description admin routes
 */

//mentor management
mentorRouter.post('/signup', signupMentor.create);
mentorRouter.post('/login', loginMentor.get);
mentorRouter.get('/list-mentor', listMentor.list);
mentorRouter.get('/get-mentor/:id', paramsValidator.validate, getMentorById.get)
mentorRouter.delete('/delete-mentor/:id', paramsValidator.validate, deleteMentor.delete);


//course management
mentorRouter.get('/list-course', listCourse.list);
mentorRouter.get('/get-course/:id', paramsValidator.validate, getCourseById.get);
mentorRouter.delete('/delete-course/:id', paramsValidator.validate,deleteCourseById.delete);
mentorRouter.post('/create-course', createCourseController.create);

//lesson management
mentorRouter.get('/list-lesson', listLesson.list);
mentorRouter.get('/get-lesson/:id', paramsValidator.validate, getLessonById.get);
mentorRouter.delete('/delete-lesson/:id', paramsValidator.validate,deleteLessonById.delete);
mentorRouter.post('/create-lesson', createLessonController.create);

module.exports = mentorRouter;