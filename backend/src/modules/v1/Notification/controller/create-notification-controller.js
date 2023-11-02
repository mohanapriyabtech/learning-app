import { Notification } from "../models/notification-model";





class NotificationController {

    constructor() {
    }

    /**
     * @description  API to store notification
     * @param {*} req 
     * @param {*} res 
     */

    async store(model_name, params, receiverId, senderId, message, sender, receiver, type) {
        try {
            console.log("enter")
            await Notification.create({ service: model_name, data: JSON.stringify(params), receiver: receiverId, sender: senderId, message: message, docModel_sender: sender, docModel_receiver: receiver, type: type })
                                    
            console.log("notification")
        }

        catch (err) {
            console.log(err);
        }
    }
}

export default new NotificationController()