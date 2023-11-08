import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema, ObjectId } = mongoose;

/**
 * mentor course Schema
 * @description MentorCourse model
 */

const MentorCourseSchema = new Schema({
    instructor: {
      type: ObjectId,
      required:true
    },
    description: {
      type: String,
      required: true,
    },
    mentor_course: {
      type: String,
      required: true,
      unique: true
    },
    cover_image: {
      type: String
    },
    cover_image_url: {
      type: String
    },
    total_lesson: Number,
    status: {
      type: Number,
      default: false   //0  set for false
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
      
}, { versionKey: false, timestamps: false });

CourseSchema.plugin(mongoosePaginate);
CourseSchema.index({ name: 'text' });

export const Course = mongoose.model('course',CourseSchema);