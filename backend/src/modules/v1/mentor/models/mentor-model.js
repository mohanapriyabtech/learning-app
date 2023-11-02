import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema, ObjectId } = mongoose;


const MentorSchema = new Schema({

  mentor_name: {
    type: String,
    required: true,
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
  status: {
    type: Number,
    default: 0
  },
  phone_number: {
    type: String,
    required: true
  },
  address: {
    type: String,
  },
  profile_image: {
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
