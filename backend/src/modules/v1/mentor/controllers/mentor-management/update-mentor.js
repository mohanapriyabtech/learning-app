import { responseHandler } from "../../../../../utils/response-handler";
import { Mentor } from "../../models/mentor-model";



class UpdateMentorController {

    constructor() {
    }

    /**
      * @description   api to update Mentor 
      * @param {*} req /api/v1/Mentor/update
      * @param {*} res 
      */

    async update(req, res) {

        try {
            const result = await Mentor.findByIdAndUpdate(req.params.id, req.body, { new: true })
            console.log(result)
            if (result) {
                return responseHandler.successResponse(res, result, "Mentor details updated successfull", 200);
            } else {
                return responseHandler.errorResponse(res, {}, "Mentor details not found", 400);
            }
        }
        catch (err) {
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new UpdateMentorController();

