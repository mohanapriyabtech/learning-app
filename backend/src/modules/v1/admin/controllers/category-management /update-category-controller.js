import { responseHandler } from "../../../../../utils/response-handler";
import { Category } from "../../models/category-model";



class UpdatecategoryController {

    constructor() {
    }

    /**
     * @descriptions   update category details
     * @param {*} req  /api/v1/admin/update-category/6384c6edb9eda24175b56c85
     * @body           
     * {             
     * "name":"aravindh"              
     * }
     * @param {*} res 
     */

    async update(req, res) {

        try {
            const result = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();

            if (result) {
                return responseHandler.successResponse(res, result, "category updated successfully");
            } else {
                return responseHandler.errorResponse(res, {}, "category not found", 400);
            }
        } catch (err) {
            return responseHandler.errorResponse(res, err);
        }
    }
}

export default new UpdatecategoryController();



