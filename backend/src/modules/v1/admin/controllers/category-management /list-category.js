import { responseHandler } from "../../../../../utils/response-handler";
import { Category} from "../../models/category-model";



class ListcategoryController {

    constructor() {
    }

    /**
      * @description   api to get category details
      * @param {*} req /api/v1/user/get-category/:id
      * @param {*} res 
      */

    async list(req, res) {

        try {
            const result = await Category.find().sort({ created_at: -1 });
            if (result.length != 0) {
                return responseHandler.successResponse(res, result, "category list retrived successfull", 200);
            } else {
                return responseHandler.errorResponse(res, result, "No categories found", 200);
            }
        }
        catch (err) {
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new ListcategoryController();

