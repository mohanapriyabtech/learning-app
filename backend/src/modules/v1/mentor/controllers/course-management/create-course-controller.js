
import { decrypt } from "../../../../../utils/encrypt";
import { responseHandler } from "../../../../../utils/response-handler";
import { Course} from "../../../admin/models/course-model";
import { v4 as uuidv4 } from 'uuid';






class courseCreateController {

    constructor() {
    }

    /**
     * @description   API to create course
     * @param {*} req /api/v1/admin/create-course
     * @param {*} res 
     */

    async create(req, res) {

        try {

            const result = await Course.create(req.body)
            return responseHandler.successResponse(res, result, "course created successfully", 200);

        } catch (err) {
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new courseCreateController();

