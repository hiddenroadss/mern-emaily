import mongoose from 'mongoose';


const { Schema } = mongoose;
const userSchema = new Schema({
    googleId: String,
    facebookId: String
});

export const User = mongoose.model('users', userSchema);