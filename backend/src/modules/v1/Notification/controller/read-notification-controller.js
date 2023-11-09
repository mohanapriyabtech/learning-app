import { responseHandler } from "../../../../utils/response-handler";
import { Notification } from "../models/notification-model";


class ReadNotificationController {

    constructor() {
    }

    /**
     * @description  API for read notifications By Ids
     * @param {*} req 
     * @param {*} res 
     */

    Update(req, res) {

        try {
            Notification.updateMany({ _id: req.body.notifications }, { read: 1 }).exec(async (err, result) => {
                if (err) return responseHandler.errorResponse(res, err);
                if (result.length != 0) {
                    // const receiver = await Notification.findById(req.body.notifications[0])
                    let notifications = await Notification.find({ receiver: receiver.receiver }).populate('receiver sender')
                    let results = []
                    for (let i = 0; i < notifications.length; i++) {
                        let convert = Object.assign({}, notifications[i])._doc
                        convert.data = JSON.parse(notifications[i].data)
                        results.push(convert);
                    }
                    results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    const unread_notification_count = notifications.map(obj => obj.read === 0)
                        .reduce((acc, curr) => curr ? acc + 1 : acc, 0);
                    return responseHandler.successResponse(res, { results, unread_notification_count }, 'Notifications read');
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


export default new ReadNotificationController();
