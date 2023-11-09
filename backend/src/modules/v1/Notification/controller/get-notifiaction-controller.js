import { responseHandler } from "../../../../utils/response-handler";
import { Notification } from "../models/notification-model";



class ListNotificationController {

    constructor() {
    }

    /**
     * @description  API for Get notifications By Id
     * @param {*} req 
     * @param {*} res 
     */

    List(req, res) {

        try {
            Notification.find({ receiver: req.params.id }).populate('receiver').populate('sender').exec(async (err, result) => {
                if (err) return responseHandler.errorResponse(res, err);
                if (result.length != 0) {
                    let results = []
                    for (let i = 0; i < result.length; i++) {
                        let convert = Object.assign({}, result[i])._doc
                        convert.data = JSON.parse(result[i].data)
                        if (convert.type == 6 || convert.type == 7) {
                            convert.tag = convert.data.tag
                        }
                        results.push(convert);
                    }
                    results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    const unread_notification_count = result.map(obj => obj.read === 0)
                        .reduce((acc, curr) => curr ? acc + 1 : acc, 0);

                    return responseHandler.successResponse(res, { results, unread_notification_count }, 'Notifications');
                } else {
                    return responseHandler.successResponse(res, [], 'No Notifications');
                }
            })
        }

        catch (err) {
            console.log(err);
            responseHandler.errorResponse(res, err.message);
        }

    }
}


export default new ListNotificationController();
