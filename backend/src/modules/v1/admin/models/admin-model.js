import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;

/**
 * AdminSchema
 * @description Admin model
 */

const AdminSchema = new Schema({

    name: {
        type: String,
        required: [true, 'name must not be empty'],
    },
    email: {
        type: String,
        required: [true, 'email must not be empty'],
        unique: true
    },
    is_primary: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: [true, 'password must not be empty'],
    },
    status: {
        type: Number,
        default: 1
    },
    created_at: {
        type: Date,
        default: Date.now
    }

}, { versionKey: false });

// AdminSchema.plugin(mongoosePaginate);

// AdminSchema.index({ name: 'text' });

export const Admin = mongoose.model('admin', AdminSchema);