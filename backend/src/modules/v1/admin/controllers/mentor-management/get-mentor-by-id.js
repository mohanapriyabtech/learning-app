import { responseHandler } from "../../../../../utils/response-handler";
import { Mentor} from "../../../mentor/models/mentor-model";



class GetMentorController {

    constructor() {
    }

    /**
     * @description   API to get project by ID
     * @param {*} req /api/v1/admin/get-project/63a56af6af119c87cca09b1d
     * @param {*} res 
     */

    async get(req, res) {

        try {
            const result = await Mentor.findById(req.params.id).exec();
            if (result) {
                return responseHandler.successResponse(res, result, "Mentor details retrieved successfully");
            } else {
                return responseHandler.errorResponse(res, {}, "Mentor not found", 400);
            }
            
        } catch (err) {
            console.log(err);
            return responseHandler.errorResponse(res, err);
        }

    }
}


export default new GetMentorController();
