
import { responseHandler } from "../../../../../utils/response-handler";
import { Course } from "../../../admin/models/course-model";



class GetCourseByCategoryontroller {

    constructor() {
    }

    /**
     * @description   
     * @param {*} req 
     * @param {*} res 
     */

    async get(req, res) {

        try {
        
            const categoryIds = req.params.categoryId.split(',');

            const result = await Course.find({ category_id: { $in: categoryIds } }).populate('category_id').exec();
            if (result.length !== 0) {
                return responseHandler.successResponse(res, result, "Course details retrieved successfully");
            } else {
                return responseHandler.successResponse(res, [], "Course not found");
            }
            
        } catch (err) {
            console.log(err);
            return responseHandler.errorResponse(res, err);
        }

    }
}


export default new GetCourseByCategoryontroller();
