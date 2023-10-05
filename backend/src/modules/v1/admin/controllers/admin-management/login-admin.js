import { responseHandler } from "../../../../../utils/response-handler";
import { createSession, decrypt } from "../../../../../utils/encrypt";
import { Admin } from "../../models/admin-model";


class LoginController {

    constructor() {
    }

    /**
      * @description   api to admin login
      * @param {*} req /api/v1/admin/login
      * @param {*} res 
      */

    async get(req, res) {

        try {
            const admin = await Admin.findOne({ email: req.body.email })
            if (admin) {
                if (decrypt(admin.password) === req.body.password) {
                    const session = await createSession(admin)
                    return responseHandler.successResponse(res, { admin, session }, "Admin logged in successfull", 200);
                } else {
                    return responseHandler.errorResponse(res, {}, "Password wrong , try again", 400);
                }
            } else {
                return responseHandler.errorResponse(res, {}, "No admin exist with this username", 400);
            }
        }
        catch (err) {
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new LoginController();

