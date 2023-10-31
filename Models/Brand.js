import mongoose from '../connection.js';
const { Schema } = mongoose;

const BrandSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  description: {
    type: String,
    required: false,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Brand = mongoose.model('Brand', BrandSchema);
let error;
try {
  await Brand.save();
} catch (err) {
  error = err;
}
export default Brand;
