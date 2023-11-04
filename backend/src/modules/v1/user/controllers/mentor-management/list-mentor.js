import { responseHandler } from "../../../../../utils/response-handler";
import { Mentor } from "../../models/mentor-model";



class ListMentorController {

    constructor() {
    }

    /**
      * @description   api to get Mentor details
      * @param {*} req /api/v1/Mentor/get-Mentor/:id
      * @param {*} res 
      */

    async list(req, res) {

        try {
            const result = await Mentor.find({status:1}).exec()
            if (result.length != 0) {
                return responseHandler.successResponse(res, result, "Mentor list retrived successfull", 200);
            } else {
                return responseHandler.errorResponse(res, result, "No Mentors found", 200);
            }
        }
        catch (err) {
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new ListMentorController();

