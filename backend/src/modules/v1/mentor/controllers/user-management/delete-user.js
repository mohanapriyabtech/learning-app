import { responseHandler } from "../../../../../utils/response-handler";
import { User } from "../../../user/models/user-model";


class DeleteUserController {

    constructor() {
    }

    /**
      * @description   api to user signup
      * @param {*} req /api/v1/user/signup
      * @param {*} res 
      */

    async delete(req, res) {

        try {
            const result = await User.findByIdAndDelete(req.params.id)
            if(result){
                return responseHandler.successResponse(res, result, "User details deleted successfull", 200);
            } else{
                return responseHandler.errorResponse(res, {}, "User details not found", 400);
            }
        }
        catch (err) {
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new DeleteUserController();

