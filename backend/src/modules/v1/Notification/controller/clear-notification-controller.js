import { responseHandler } from "../../../../utils/response-handler";
import { Notification } from "../models/notification-model";


class ClearNotificationController {

    constructor() {
    }

    /**
     * @description  API for delete notifications By Ids
     * @param {*} req 
     * @param {*} res 
     */

    Delete(req, res) {

        try {
            Notification.deleteMany({ receiver: req.params.id }).exec(async(err, result) => {
                if (err) return responseHandler.errorResponse(res, err);
                if (result) {
                    return responseHandler.successResponse(res, result, 'Notification deleted');
                } else {
                    return responseHandler.successResponse(res, {}, 'No Notifications', 400);
                }
            })
        }

        catch (err) {
            console.log(err);
            responseHandler.errorResponse(res, err.message);
        }

    }
}


export default new ClearNotificationController();
