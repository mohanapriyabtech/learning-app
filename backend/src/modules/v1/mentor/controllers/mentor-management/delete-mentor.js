import { responseHandler } from "../../../../../utils/response-handler";
import { Mentor } from "../../models/mentor-model";



class DeleteMentorController {

    constructor() {
    }

    /**
      * @description   api to Mentor signup
      * @param {*} req /api/v1/Mentor/signup
      * @param {*} res 
      */

    async delete(req, res) {

        try {
            const result = await Mentor.findByIdAndDelete(req.params.id)
            if(result){
                return responseHandler.successResponse(res, result, "Mentor details deleted successfull", 200);
            } else{
                return responseHandler.errorResponse(res, {}, "Mentor details not found", 400);
            }
        }
        catch (err) {
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new DeleteMentorController();

