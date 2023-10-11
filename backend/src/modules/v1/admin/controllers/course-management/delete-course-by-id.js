import { responseHandler } from "../../../../../utils/response-handler";
import { Course } from "../../models/course-model";



class DeleteCourseController {

    constructor() {
    }

    /**
      * @description   
      * @param {*} req /api/v1/admin/delete-course/:id
      * @param {*} res 
      */

    async delete(req, res) {

        try {
            const result = await Course.findByIdAndDelete(req.params.id)
            if(result) {
                return responseHandler.successResponse(res, result, "Course details deleted successfull", 200);
            } else {
                return responseHandler.errorResponse(res, {}, "Course not found", 400);
            }
        }
        catch (err) {
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new DeleteCourseController();

