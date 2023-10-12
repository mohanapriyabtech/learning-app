import { responseHandler } from "../../../../../utils/response-handler";
import { Lesson } from "../../../admin/models/lesson-model";



class GetLessonByIdController {

    constructor() {
    }

    /**
     * @description   API to get Course by ID
     * @param {*} req /api/v1/admin/get-lesson/63a56af6af119c87cca09b1d
     * @param {*} res 
     */

    async get(req, res) {

        try {
            const result = await Lesson.findById(req.params.id).exec();
            if (result) {
                return responseHandler.successResponse(res, result, "Lesson details retrieved successfully");
            } else {
                return responseHandler.errorResponse(res, {}, "Lesson not found", 400);
            }
            
        } catch (err) {
            console.log(err);
            return responseHandler.errorResponse(res, err);
        }

    }
}


export default new GetLessonByIdController();
