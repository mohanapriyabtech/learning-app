import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

/**
 * Project Schema
 * @description Project model
 */

const ProjectSchema = new Schema({

    name: {
        type: String,
        required: [true, 'name must not be empty'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'description must not be empty'],
    },
    user_id: {
        type: ObjectId,
        ref: "User"
    },
    file_url: {
        type: String,
        required: [true, 'file must not be empty'],
    },
    api_key: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }

}, { versionKey: false, timestamps: false });

ProjectSchema.plugin(mongoosePaginate);
ProjectSchema.index({ name: 'text' });

export const Project = mongoose.model('Project',ProjectSchema);