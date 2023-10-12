import { responseHandler } from "../../../../../utils/response-handler";
import { Lesson } from "../../../admin/models/lesson-model";



class ListLessonController {

    constructor() {
    }

    /**
      * @description   api to get Course details
      * @param {*} req /api/v1/user/list-lesson
      * @param {*} res 
      */

    async list(req, res) {

        try {
            const result = await Lesson.find()
            if (result.length != 0) {
                return responseHandler.successResponse(res, result, "Lesson list retrived successfull", 200);
            } else {
                return responseHandler.errorResponse(res, result, "No Lesson found", 200);
            }
        }
        catch (err) {
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new ListLessonController();

