import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema, ObjectId } = mongoose;

/**
 * course Schema
 * @description Course model
 */

const CourseSchema = new Schema({

    course: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true,
    },
    instructor: {
      type: ObjectId,
      ref: 'mentor',
      required:true
    },
    category_id: {
      type: ObjectId,
      ref: 'category',
      required:true
    },
    profile_image: {
      type: String
    },
    profile_image_url: {
      type: String
    },
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

export const Course = mongoose.model('course',CourseSchema);