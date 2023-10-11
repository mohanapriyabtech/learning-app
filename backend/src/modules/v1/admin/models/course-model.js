import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema, ObjectId } = mongoose;

/**
 * course Schema
 * @description Course model
 */

const CourseSchema = new Schema({

    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructor: {
      type: ObjectId,
      ref: 'Mentor', 
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    cover_image: {
      type: String, 
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
      
}, { versionKey: false, timestamps: false });

CourseSchema.plugin(mongoosePaginate);
CourseSchema.index({ name: 'text' });

export const Course = mongoose.model('course',CourseSchema);