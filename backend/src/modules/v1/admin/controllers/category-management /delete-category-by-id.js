import { responseHandler } from "../../../../../utils/response-handler";
import { Category} from "../../models/category-model";



class DeletecategoryController {

    constructor() {
    }

    /**
      * @description   
      * @param {*} req /api/v1/admin/delete-category/:id
      * @param {*} res 
      */

    async delete(req, res) {

        try {
            const result = await Category.findByIdAndDelete(req.params.id)
            if(result) {
                return responseHandler.successResponse(res, result, "category details deleted successfull", 200);
            } else {
                return responseHandler.errorResponse(res, {}, "category not found", 400);
            }
        }
        catch (err) {
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new DeletecategoryController();

