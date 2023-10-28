import bcrypt from 'bcrypt';
import mongoose from "../connection.js";
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true
  },
});

UserSchema.pre("save", async function (next) {
    //autenticar Token 
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
      }
      next();
});

const User = mongoose.model("User", UserSchema);

export default User;
