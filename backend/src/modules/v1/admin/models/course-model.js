import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema, ObjectId } = mongoose;

/**
 * course Schema
 * @description Course model
 */

const CourseSchema = new Schema({
    instructor: {
      type: ObjectId,
      required:true
    },
    description: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    cover_image: {
      type: String
    },
    cover_image_url: {
      type: String
    },
    status: {
      type: Number,
      default: 0
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
      
}, { versionKey: false, timestamps: false });

CourseSchema.plugin(mongoosePaginate);
CourseSchema.index({ name: 'text' });

export const Course = mongoose.model('course',CourseSchema);