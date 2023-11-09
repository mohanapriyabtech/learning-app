import { responseHandler } from "../../../../utils/response-handler";
import { Notification } from "../models/notification-model";


class DeleteNotificationController {

    constructor() {
    }

    /**
     * @description  API for delete notifications By Ids
     * @param {*} req 
     * @param {*} res 
     */

    Delete(req, res) {

        try {
            Notification.findByIdAndDelete(req.params.id).exec(async (err, result) => {
                if (err) return responseHandler.errorResponse(res, err);
                if (result) {
                    let notifications = await Notification.find({ receiver: result.receiver }).populate('receiver sender')
                    let results = []
                    for (let i = 0; i < notifications.length; i++) {
                        let convert = Object.assign({}, notifications[i])._doc
                        convert.data = JSON.parse(notifications[i].data)
                        results.push(convert);
                    }
                    results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    const unread_notification_count = notifications.map(obj => obj.read === 0)
                        .reduce((acc, curr) => curr ? acc + 1 : acc, 0);
                    return responseHandler.successResponse(res, { results, unread_notification_count }, 'Notification deleted');
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


export default new DeleteNotificationController();
