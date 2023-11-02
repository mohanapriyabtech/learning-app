import { responseHandler } from "../../../../../utils/response-handler";
import { Course } from "../../models/course-model";


class SearchCourseController {

    constructor() {
    }

    /**
     * @description  
     * @param {*} req /api/v1/admin/search-course
     * @param {*} res 
     */

    async search(req, res) {

        try {
            const { course } = req.query;
            const search = {};
              
              if (course) {
                search.$or = [
                  { description: { $regex: new RegExp(course, 'i') } },
                  { course: { $regex: new RegExp(course, 'i') } },
                ];
              }

            const result = await Course.find(search).exec()
            if (result.length !== 0) {
                return responseHandler.successResponse(res, result, 'course list retrived successfully');
            } else {
                return responseHandler.errorResponse(res, {}, 'No courses found', 400);
            }
                

        } catch (err) {
            console.log(err);
            return responseHandler.errorResponse(res, err.message);
        }

    }
}


export default new SearchCourseController();
