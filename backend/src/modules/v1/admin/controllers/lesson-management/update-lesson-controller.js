import { responseHandler } from "../../../../../utils/response-handler";
import { Lesson } from "../../models/lesson-model";



class UpdateLessonController {

    constructor() {
    }

    /**
     * @descriptions   update Course details
     * @param {*} req  /api/v1/admin/update-lesson/6384c6edb9eda24175b56c85
     * @body           
     * {             
     * "name":"aravindh"              
     * }
     * @param {*} res 
     */

    async update(req, res) {

        try {
            const file = req.body.file;

            const result = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();

            if (result) {
                return responseHandler.successResponse(res, result, "Course updated successfully");
            } else {
                return responseHandler.errorResponse(res, {}, "Course not found", 400);
            }
        } catch (err) {
            return responseHandler.errorResponse(res, err);
        }
    }
}

export default new UpdateLessonController();



