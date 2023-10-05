import { responseHandler } from "../../../../../utils/response-handler";
import { Project } from "../../../user/models/project-model";


class DeleteProjectController {

    constructor() {
    }

    /**
      * @description   api to user signup
      * @param {*} req /api/v1/user/delete/:id
      * @param {*} res 
      */

    async delete(req, res) {

        try {
            const result = await Project.findByIdAndDelete(req.params.id)
            if(result) {
                return responseHandler.successResponse(res, result, "Project details deleted successfull", 200);
            } else {
                return responseHandler.errorResponse(res, {}, "Project not found", 400);
            }
        }
        catch (err) {
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new DeleteProjectController();

