import { responseHandler } from "../../../../../utils/response-handler";
import { createSession, decrypt } from "../../../../../utils/encrypt";
import { Mentor } from "../../models/mentor-model";


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
            const mentor = await Mentor.findOne({ email: req.body.email })
            if (mentor) {
                if (decrypt(mentor.password) === req.body.password) {
                    const session = await createSession(mentor)
                    return responseHandler.successResponse(res, { mentor, session }, "Mentor logged in successfull", 200);
                } else {
                    return responseHandler.errorResponse(res, {}, "Password wrong , try again", 400);
                }
            } else {
                return responseHandler.errorResponse(res, {}, "No Mentor exist with this username", 400);
            }
        }
        catch (err) {
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new LoginController();

