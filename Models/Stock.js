import mongoose from '../connection.js';
const { Schema } = mongoose;

const StockSchema = new Schema({
    quantity: {
        type: Number,
        required: false,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        unique: true
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

const Stock = mongoose.model('Stock', StockSchema);
let error;
try {
  await Stock.save();
} catch (err) {
  error = err;
}
export default Stock;
