import mongoose from '../connection.js';
const { Schema } = mongoose;

const StockHistorySchema = new Schema({
    quantity: {
        type: Number,
        required: false,
    },
    warning_quantity: {
        type: Boolean,
        required: false,
    },
    last_quantity: {
        type: Number,
        required: false,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    type: {
        type: String,
        enum: ['outflow', 'inflow'],
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    stock: {
        type: Schema.Types.ObjectId,
        ref: 'Stock'
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

const StockHistory = mongoose.model('StockHistory', StockHistorySchema);
let error;
try {
  await StockHistory.save();
} catch (err) {
  error = err;
}
export default StockHistory;