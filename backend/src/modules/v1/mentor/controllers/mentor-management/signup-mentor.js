import { responseHandler } from "../../../../../utils/response-handler";
import { createSession, encrypt } from "../../../../../utils/encrypt";
import { Mentor } from "../../models/mentor-model";


class SignupController {

    constructor() {
    }

    /**
      * @description   api to mentor signup
      * @param {*} req /api/v1/mentor/signup
      * @param {*} res 
      */

    async create(req, res) {

        try {
            req.body.password = encrypt(req.body.password)
            const mentor = await Mentor.create(req.body)
            if (mentor) {
                const session = await createSession(mentor)
                return responseHandler.successResponse(res, { mentor, session }, "mentor signup successfull", 200);
            } else {
                return responseHandler.errorResponse(res, {}, "mentor creation failed", 400);

            }
        }
        catch (err) {
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new SignupController();

