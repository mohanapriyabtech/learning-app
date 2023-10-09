import { responseHandler } from "../../../../../utils/response-handler";
import { Project } from "../../../user/models/project-model";



class UpdateProjectController {

    constructor() {
    }

    /**
     * @descriptions   update project details
     * @param {*} req  /api/v1/admin/update-project/6384c6edb9eda24175b56c85
     * @body           
     * {             
     * "name":"aravindh"              
     * }
     * @param {*} res 
     */

    async update(req, res) {

        try {
            const file = req.body.file;

            const result = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();

            if (result) {
                //adminLogController.store(req.headers.authorization, result.id, 'Project', 'Project details updated', result);
                return responseHandler.successResponse(res, result, "Project updated successfully");
            } else {
                return responseHandler.errorResponse(res, {}, "Project not found", 400);
            }
        } catch (err) {
            return responseHandler.errorResponse(res, err);
        }
    }
}

export default new UpdateProjectController();



