
import { decrypt } from "../../../../../utils/encrypt";
import { responseHandler } from "../../../../../utils/response-handler";
import createNotificationController from "../../../Notification/controller/create-notification-controller";

import { v4 as uuidv4 } from 'uuid';
import { Category } from "../../models/category-model";






class categoryCreateController {

    constructor() {
    }

    /**
     * @description   API to create category
     * @param {*} req /api/v1/admin/create-category
     * @param {*} res 
     */

    async create(req, res) {

        try {

            const result = await Category.create(req.body)
            console.log(req.headers.authorization)
            req.headers.authorization = req.headers.authorization.split(' ')[1];
            console.log(req.headers.authorization)
            const senderId = JSON.parse(decrypt(req.headers.authorization))
            console.log(senderId)
            await createNotificationController.store("category", result,"all" ,senderId._id, "category created", "admin" ,"user", 1)
            return responseHandler.successResponse(res, result, "category created successfully", 200);

        } catch (err) {
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new categoryCreateController();

