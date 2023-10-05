
import { decrypt } from "../../../../../utils/encrypt";
import { responseHandler } from "../../../../../utils/response-handler";
import { Project } from "../../models/project-model";
import { v4 as uuidv4 } from 'uuid';






class ProjectCreateController {

    constructor() {
    }

    /**
     * @description   API to create project
     * @param {*} req /api/v1/admin/create-project
     * @param {*} res 
     */

    async create(req, res) {

        try {

            const project = new Project(req.body)
            // Generate a UUID
            project.api_key = uuidv4();
            project.user_id = req.body.user_id
            project.save()

            .then(result => {
                return responseHandler.successResponse(res, result, "Project created successfully", 200);
            })
            .catch(err => {
                return responseHandler.errorResponse(res, err);
            });

        } catch (err) {
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new ProjectCreateController();

