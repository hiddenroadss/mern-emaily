import mongoose from 'mongoose';


const { Schema } = mongoose;
const userSchema = new Schema({
    googleId: String,
    facebookId: String,
    credits: { type: Number, default: 0}
});

export const User = mongoose.model('users', userSchema);