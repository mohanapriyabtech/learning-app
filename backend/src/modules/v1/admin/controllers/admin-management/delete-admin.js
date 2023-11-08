import { responseHandler } from "../../../../../utils/response-handler";
import { Admin } from "../../models/admin-model";


class DeleteAdminController {

    constructor() {
    }

    /**
      * @description   
      * @param {*} req 
      * @param {*} res 
      */

    async delete(req, res) {

        try {
            const result = await Admin.findByIdAndDelete(req.params.id)
            if(result){
                return responseHandler.successResponse(res, result, "Admin details deleted successfull", 200);
            } else{
                return responseHandler.errorResponse(res, {}, "Admin details not found", 400);
            }
        }
        catch (err) {
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new DeleteAdminController();

