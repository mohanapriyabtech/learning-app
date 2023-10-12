import { responseHandler } from "../../../../../utils/response-handler";
import { Lesson } from "../../../admin/models/lesson-model";



class DeleteLessonController {

    constructor() {
    }

    /**
      * @description   
      * @param {*} req /api/v1/admin/delete-lesson/:id
      * @param {*} res 
      */

    async delete(req, res) {

        try {
            const result = await Lesson.findByIdAndDelete(req.params.id)
            if(result) {
                return responseHandler.successResponse(res, result, "Lesson details deleted successfull", 200);
            } else {
                return responseHandler.errorResponse(res, {}, "Lesson not found", 400);
            }
        }
        catch (err) {
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new DeleteLessonController();

