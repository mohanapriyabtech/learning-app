import { responseHandler } from "../../../../../utils/response-handler";
import { Admin } from "../../models/admin-model";


class ListAdminController {

    constructor() {
    }

    /**
      * @description   api to get admin details
      * @param {*} req /api/v1/admin/get-admin/:id
      * @param {*} res 
      */

    async list(req, res) {

        try {
            const result = await Admin.find().sort({ created_at: -1 });
            if (result.length != 0) {
                return responseHandler.successResponse(res, result, "Admin list retrived successfull", 200);
            } else {
                return responseHandler.errorResponse(res, [], "No admins found", 200);
            }
        }
        catch (err) {
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new ListAdminController();

