import { responseHandler } from "../../../../../utils/response-handler";
import { Lesson } from "../../../admin/models/lesson-model";



class GetLessonByCourseIdController {

    constructor() {
    }

    /**
     * @description   
     * @param {*} req 
     * @param {*} res 
     */

    async get(req, res) {

        try {
            console.log(req.params.courseId)
            const result = await Lesson.find( {course_id:req.params.courseId }).exec();
            if (result.length !== 0) {
                return responseHandler.successResponse(res, result, "Lesson details retrieved successfully");
            } else {
                return responseHandler.successResponse(res, [], "Lesson not found");
            }
            
        } catch (err) {
            console.log(err);
            return responseHandler.errorResponse(res, err);
        }

    }
}


export default new GetLessonByCourseIdController();
