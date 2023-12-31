import { responseHandler } from "../../../../../utils/response-handler";
import { Project } from "../../models/project-model";


class ListprojectController {

    constructor() {
    }

    /**
      * @description   api to get project details
      * @param {*} req /api/v1/user/list-project
      * @param {*} res 
      */

    async list(req, res) {

        try {
            const result = await Project.find()
            if (result.length != 0) {
                return responseHandler.successResponse(res, result, "project list retrived successfull", 200);
            } else {
                return responseHandler.errorResponse(res, result, "No projects found", 200);
            }
        }
        catch (err) {
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new ListprojectController();

