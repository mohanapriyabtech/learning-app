
import { decrypt } from "../../../../../utils/encrypt";
import { responseHandler } from "../../../../../utils/response-handler";
import { Course} from "../../../admin/models/course-model";
import createNotificationController from "../../../Notification/controller/create-notification-controller";






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
            req.headers.authorization = req.headers.authorization.split(' ')[1];
            const senderId = JSON.parse(decrypt(req.headers.authorization))
            req.body.instructor = senderId.id
            const result = await Course.create(req.body)
            await createNotificationController.store("course", result, "all","Admin", "course created", "admin" ,"user", 1)
            return responseHandler.successResponse(res, result, "Course created successfully", 200);

        } catch (err) {
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new courseCreateController();

