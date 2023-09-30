import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

/**
 * UserSchema
 * @description User model
 */

const UserSchema = new Schema({

    name: {
        type: String,
        required: [true, 'name must not be empty'],
    },
    email: {
        type: String,
        required: [true, 'email must not be empty'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password must not be empty'],
    },
    // phone_number: {
    //     type: Number,
    //     required: [true, 'phone_number must not be empty'],
    //     unique: true
    // },
    email_verified: {
        type: Number,
        default: 0
    },
    reset_token: {
        type: String,
    },
    token_expires: {
        type: String,
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

// UserSchema.plugin(mongoosePaginate);

// UserSchema.index({ name: 'text' });

export const User = mongoose.model('User', UserSchema);