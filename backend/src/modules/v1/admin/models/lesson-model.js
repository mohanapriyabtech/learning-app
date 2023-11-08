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
  mentor_id:{
    type: ObjectId,
    ref: 'mentor',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  video_url: {
    type: String,
  },
  lesson: {
    type: Number,
  },
  github_url: String,
  document_url: {
    type: [String]
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
    
}, { versionKey: false, timestamps: false });

LessonSchema.plugin(mongoosePaginate);
LessonSchema.index({ name: 'text' });

export const Lesson = mongoose.model('lesson', LessonSchema);
