
import { decrypt } from "../../../../../utils/encrypt";
import { responseHandler } from "../../../../../utils/response-handler";
import { v4 as uuidv4 } from 'uuid';
import { Lesson } from "../../../admin/models/lesson-model";






class LearnCreateController {

    constructor() {
    }

    /**
     * @description   API to create course
     * @param {*} req /api/v1/admin/create-lesson
     * @param {*} res 
     */

    async create(req, res) {

        try {

            const result = await Lesson.create(req.body)
            return responseHandler.successResponse(res, result, "Lesson created successfully", 200);

        } catch (err) {
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new LearnCreateController();

