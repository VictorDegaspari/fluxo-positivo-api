// import bcrypt from 'bcrypt';
import mongoose from '../connection.js';
const { Schema } = mongoose;

const UserSchema = new Schema({
});

UserSchema.pre('save', async function (next) {
});

const User = mongoose.model('User', UserSchema);

export default User;