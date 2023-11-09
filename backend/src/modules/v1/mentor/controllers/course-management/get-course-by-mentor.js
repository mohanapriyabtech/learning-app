import { responseHandler } from "../../../../../utils/response-handler";
import { Course } from "../../../admin/models/course-model";



class GetCourseByMentorController {

    constructor() {
    }

    /**
     * @description   
     * @param {*} req 
     * @param {*} res 
     */

    async get(req, res) {

        try {
        
            const result = await Course.find( {instructor:req.params.mentorId }).populate('category_id').sort({ created_at: -1 }).exec();
            if (result.length !== 0) {
                return responseHandler.successResponse(res, result, "Course details retrieved successfully");
            } else {
                return responseHandler.successResponse(res, [], "Course not found");
            }
            
        } catch (err) {
            console.log(err);
            return responseHandler.errorResponse(res, err);
        }

    }
}


export default new GetCourseByMentorController();
