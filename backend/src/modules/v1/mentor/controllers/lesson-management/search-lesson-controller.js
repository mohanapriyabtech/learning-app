import { responseHandler } from "../../../../../utils/response-handler";
import { Lesson } from "../../../admin/models/lesson-model";



class SearchlessonController {

    constructor() {
    }

    /**
     * @description  
     * @param {*} req /api/v1/admin/search-lesson
     * @param {*} res 
     */

    async search(req, res) {

        try {
            const { lesson} = req.query;
            const search = {}
              
              if (lesson) {
                search.$or = [
                  { title: { $regex: new RegExp(lesson, 'i') } },
                //   { email: { $regex: new RegExp(lesson, 'i') } },
                ];
              }

            const result = await Lesson.find(search).exec()
            if (result.length !== 0) {
                return responseHandler.successResponse(res, result, 'lesson list retrived successfully');
            } else {
                return responseHandler.successResponse(res, [], 'No lessons found');
            }
                

        } catch (err) {
            console.log(err);
            return responseHandler.errorResponse(res, err.message);
        }

    }
}


export default new SearchlessonController();
