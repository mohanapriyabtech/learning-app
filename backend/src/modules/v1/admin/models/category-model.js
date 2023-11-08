import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema, ObjectId } = mongoose;

/**
 * Category Schema
 * @description Category model
 */

const CategorySchema = new Schema({
    
    category_name: {
      type: String,
      required: true,
      unique: true
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

CategorySchema.plugin(mongoosePaginate);

export const Category = mongoose.model('category',CategorySchema);