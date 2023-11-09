import { responseHandler } from "../../../../../utils/response-handler";
import { User } from "../../../user/models/user-model";


class ListUserController {

    constructor() {
    }

    /**
      * @description   api to get user details
      * @param {*} req /api/v1/user/get-user/:id
      * @param {*} res 
      */

    async list(req, res) {

        try {
            const result = await User.find().sort({ created_at: -1 })
            if (result.length != 0) {
                return responseHandler.successResponse(res, result, "User list retrived successfull", 200);
            } else {
                return responseHandler.errorResponse(res, result, "No users found", 200);
            }
        }
        catch (err) {
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new ListUserController();

