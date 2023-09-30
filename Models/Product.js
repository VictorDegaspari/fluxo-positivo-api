import mongoose from '../connection.js';
const { Schema } = mongoose;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  description: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    enum: ['internal', 'evening', 'external'],
    required: true
  },
  size: {
    type: String,
    enum: ['P', 'M', 'G', 'XG', 'XXG'],
    required: true
  },
  flap: {
    type: Boolean,
    required: false
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: 'Brand'
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('Product', ProductSchema);
let error;
try {
  await Product.save();
} catch (err) {
  error = err;
}
export default Product;
