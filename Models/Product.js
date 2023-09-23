import mongoose from '../connection.js';
const { Schema } = mongoose;

const ProductSchema = new Schema({
});


const Product = mongoose.model('Product', ProductSchema);
let error;
try {
  await Product.save();
} catch (err) {
  error = err;
}
export default Product;
