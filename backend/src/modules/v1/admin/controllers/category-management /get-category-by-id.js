import { responseHandler } from "../../../../../utils/response-handler";
import { Category } from "../../models/category-model";




class GetcategoryByIdController {

    constructor() {
    }

    /**
     * @description   API to get category by ID
     * @param {*} req /api/v1/admin/get-category/63a56af6af119c87cca09b1d
     * @param {*} res 
     */

    async get(req, res) {

        try {
            const result = await Category.findById(req.params.id).exec();
            if (result) {
                return responseHandler.successResponse(res, result, "category details retrieved successfully");
            } else {
                return responseHandler.errorResponse(res, {}, "category not found", 400);
            }
            
        } catch (err) {
            console.log(err);
            return responseHandler.errorResponse(res, err);
        }

    }
}


export default new GetcategoryByIdController();
