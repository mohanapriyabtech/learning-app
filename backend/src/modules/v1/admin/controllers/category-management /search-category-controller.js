import { responseHandler } from "../../../../../utils/response-handler";
import { Category } from "../../models/category-model";



class SearchcategoryController {

    constructor() {
    }

    /**
     * @description  
     * @param {*} req /api/v1/admin/search-category
     * @param {*} res 
     */

    async search(req, res) {

        try {
            const { category } = req.query;
            const search = {};
              
              if (category) {
                search.$or = [
                  // { description: { $regex: new RegExp(category, 'i') } },
                  { category_name: { $regex: new RegExp(category, 'i') } },
                ];
              }

            const result = await Category.find(search).exec()
            if (result.length !== 0) {
                return responseHandler.successResponse(res, result, 'category list retrived successfully');
            } else {
                return responseHandler.successResponse(res, [], 'No categories found');
            }
                

        } catch (err) {
            console.log(err);
            return responseHandler.errorResponse(res, err.message);
        }

    }
}


export default new SearchcategoryController();
