import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema, ObjectId } = mongoose;

/**
 * Notification Schema
 * @description Notification model
 */

const NotificationSchema = new Schema({

    service: {
        type: String,
        enum: ['course', 'mentor'],
        required: [true, 'service is required']
    },
    sender: String,
    receiver: String,
    message: {
        type: String,
        required: [true, 'message is required']
    },
    type: {
        type: Number,
        default: 0
    },
    data: {
        type: String,
        required: [true, 'data must not be empty'],
    },
    docModel_sender: {
        type: String,
        required: true,
        enum: ['admin', 'mentor', 'user']
    },
    docModel_receiver: {
        type: String,
        required: true,
        enum: ['admin', 'mentor', 'user']
    },
    read: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    }

}, { timestamps: false, versionKey: false });


export const Notification = mongoose.model('notification', NotificationSchema);