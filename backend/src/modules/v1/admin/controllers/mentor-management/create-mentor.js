
import { decrypt } from "../../../../../utils/encrypt";
import { responseHandler } from "../../../../../utils/response-handler";
import { Mentor} from "../../../mentor/models/mentor-model";
import { v4 as uuidv4 } from 'uuid';


class MentorCreateController {

    constructor() {
    }

    /**
     * @description   API to create mentor
     * @param {*} req /api/v1/admin/create-mentor
     * @param {*} res 
     */

    async create(req, res) {

        try {
            req.body.password = encrypt(req.body.password)
            const result = await Mentor.create(req.body)
            return responseHandler.successResponse(res, result, "Mentor created successfully", 200);

        } catch (err) {
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new MentorCreateController();

