import BaseConfig from "../config/base";
import userRouter from "../modules/v1/user/routes";
import adminRouter from "../modules/v1/admin/routes";
import mentorRouter from "../modules/v1/mentor/routes";
import fileRouter from "../modules/v1/file-upload/routes/fileupload-routes"
import notificationRouter from "../modules/v1/Notification/routes/index"
import { responseHandler } from "../utils/response-handler";


export default class RouteServiceProvider extends BaseConfig {

    constructor() {
        super();
        this.loadRoutes();
        this.routeNotFound();
    }

    /**
     * 
     * @param {*} route functions 
     */
    loadRoutes() {
        this.app.get('/', (req, res) => { res.send('Application api working') });
        this.app.use('/api/v1/user', userRouter);
        this.app.use('/api/v1/mentor', mentorRouter);
        this.app.use('/api/v1/admin', adminRouter);
        this.app.use('/api/v1/file-upload', fileRouter);
        this.app.use('/api/v1/notification',notificationRouter);
        // Serve static images
        this.app.use('/images', this.express.static('/home/sparkout/Documents/projects/learning-app/backend/var/www/html/upload'));



        
    }

    routeNotFound() {
        this.app.use((req, res, next) => {
            return responseHandler.errorResponse(res, {}, 'Requested route not found', 404);
        });
    }
}