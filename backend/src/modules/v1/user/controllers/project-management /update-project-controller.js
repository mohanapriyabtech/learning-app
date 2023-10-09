import { responseHandler } from "../../../../../utils/response-handler";
import { Project } from "../../models/project-model";



class UpdateCityController {

    constructor() {
    }

    /**
     * @descriptions   update project details
     * @param {*} req  /api/v1/user/update-project/6384c6edb9eda24175b56c85
     * @body           
     * @param {*} res 
     */

    async update(req, res) {

        try {

            const file_url = req.body.file_url
            console.log(req.body.file_url,"")
            const result = await Project.findByIdAndUpdate(req.params.id, {file_url}, { new: true }).exec();

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


export default new UpdateCityController();


