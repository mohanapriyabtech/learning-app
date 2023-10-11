import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema, ObjectId } = mongoose;


const MentorSchema = new Schema({

  mentor_name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
    
}, { versionKey: false, timestamps: false });

MentorSchema.plugin(mongoosePaginate);
MentorSchema.index({ name: 'text' });

export const Mentor = mongoose.model('mentor', MentorSchema);
