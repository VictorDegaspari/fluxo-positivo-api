import mongoose from '../connection.js';
const { Schema } = mongoose;

const DonorSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    phone: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        unique: true,
        required: false,
    },
    type: {
        type: String,
        enum: ['partner', 'donor'],
        required: true
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

const Donor = mongoose.model('Donor', DonorSchema);
let error;
try {
  await Donor.save();
} catch (err) {
  error = err;
}
export default Donor;