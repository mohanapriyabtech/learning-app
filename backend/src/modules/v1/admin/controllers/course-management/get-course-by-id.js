import { responseHandler } from "../../../../../utils/response-handler";
import { Course } from "../../models/course-model";



class GetCourseByIdController {

    constructor() {
    }

    /**
     * @description   API to get Course by ID
     * @param {*} req /api/v1/admin/get-Course/63a56af6af119c87cca09b1d
     * @param {*} res 
     */

    async get(req, res) {

        try {
            const result = await Course.findById(req.params.id).exec();
            if (result) {
                return responseHandler.successResponse(res, result, "Course details retrieved successfully");
            } else {
                return responseHandler.errorResponse(res, {}, "Course not found", 400);
            }
            
        } catch (err) {
            console.log(err);
            return responseHandler.errorResponse(res, err);
        }

    }
}


export default new GetCourseByIdController();
