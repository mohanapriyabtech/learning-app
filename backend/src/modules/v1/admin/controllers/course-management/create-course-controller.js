
import { decrypt } from "../../../../../utils/encrypt";
import { responseHandler } from "../../../../../utils/response-handler";
import createNotificationController from "../../../Notification/controller/create-notification-controller";
import { Course} from "../../models/course-model";
import { v4 as uuidv4 } from 'uuid';






class courseCreateController {

    constructor() {
    }

    /**
     * @description   API to create course
     * @param {*} req /api/v1/admin/create-course
     * @param {*} res 
     */

    async create(req, res) {

        try {

            const result = await Course.create(req.body)
            await createNotificationController.store("course", result, "all","admin", "course created", "admin" ,"user", 1)
            return responseHandler.successResponse(res, result, "course created successfully", 200);

        } catch (err) {
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new courseCreateController();

