import { responseHandler } from "../../../../../utils/response-handler";
import { createSession, encrypt } from "../../../../../utils/encrypt";
import { Admin } from "../../models/admin-model";


class SignupController {

    constructor() {
    }

    /**
      * @description   api to admin signup
      * @param {*} req /api/v1/admin/signup
      * @param {*} res 
      */

    async create(req, res) {

        try {
            req.body.password = encrypt(req.body.password)
            const user = await Admin.create(req.body)
            if (user) {
                const session = await createSession(user)
                return responseHandler.successResponse(res, { user, session }, "admin signup successfull", 200);
            } else {
                return responseHandler.errorResponse(res, {}, "admin creation failed", 400);

            }
        }
        catch (err) {
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new SignupController();

