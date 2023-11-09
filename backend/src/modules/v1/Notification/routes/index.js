import express from 'express';
import getNotifiactionController from '../controller/get-notifiaction-controller';
import readNotificationController from '../controller/read-notification-controller';
import deleteNotificationController from '../controller/delete-notification-controller';
import clearNotificationController from '../controller/clear-notification-controller';
import listNotificationController from '../controller/list-notification-controller';



const notificationRouter = express.Router();


/**
 * notification routes
 * @description notification routes
 */


notificationRouter.get('/list-notification/:id', getNotifiactionController.List);
notificationRouter.get('/notification-list', listNotificationController.List);
notificationRouter.patch('/read-notification', readNotificationController.Update);
notificationRouter.delete('/delete-notification/:id', deleteNotificationController.Delete);
notificationRouter.delete('/clear-notification/:id', clearNotificationController.Delete);

module.exports = notificationRouter;