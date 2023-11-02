import { responseHandler } from "../../../../../utils/response-handler";
import { Mentor } from "../../../mentor/models/mentor-model";


class SearchmentorController {

    constructor() {
    }

    /**
     * @description  
     * @param {*} req /api/v1/admin/search-mentor
     * @param {*} res 
     */

    async search(req, res) {

        try {
            const { mentor} = req.query;
            const search = {}
              
              if (mentor) {
                search.$or = [
                  { mentor_name: { $regex: new RegExp(mentor, 'i') } },
                  { email: { $regex: new RegExp(mentor, 'i') } },
                ];
              }

            const result = await Mentor.find(search).exec()
            if (result.length !== 0) {
                return responseHandler.successResponse(res, result, 'mentor list retrived successfully');
            } else {
                return responseHandler.errorResponse(res, {}, 'No mentors found', 400);
            }
                

        } catch (err) {
            console.log(err);
            return responseHandler.errorResponse(res, err.message);
        }

    }
}


export default new SearchmentorController();
