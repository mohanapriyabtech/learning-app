import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema, ObjectId } = mongoose;


const LessonSchema = new Schema({

  title: {
    type: String,
    required: true,
  },
  course_id:{
    type: ObjectId,
    ref: 'course',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  video_url: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
    
}, { versionKey: false, timestamps: false });

LessonSchema.plugin(mongoosePaginate);
LessonSchema.index({ name: 'text' });

export const Lesson = mongoose.model('lesson', LessonSchema);
