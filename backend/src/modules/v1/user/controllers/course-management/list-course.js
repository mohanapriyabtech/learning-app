import { responseHandler } from "../../../../../utils/response-handler";
import { Course} from "../../../admin/models/course-model";



class ListCourseController {

    constructor() {
    }

    /**
      * @description   api to get Course details
      * @param {*} req /api/v1/user/get-Course/:id
      * @param {*} res 
      */

    async list(req, res) {

        try {
            const result = await Course.find({status:1})
            if (result.length != 0) {
                return responseHandler.successResponse(res, result, "Course list retrived successfull", 200);
            } else {
                return responseHandler.errorResponse(res, result, "No Courses found", 200);
            }
        }
        catch (err) {
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new ListCourseController();

