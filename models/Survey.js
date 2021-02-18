import mongoose from 'mongoose';

import RecipientSchema from './Recipient.js';


const {Schema} = mongoose;

const surveySchema = new Schema({
    title: String,
    subject: String,
    body: String,
    recipients: [RecipientSchema],
    yes: {type: Number, default: 0},
    no: {type: Number, default: 0},
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    createdAt: Date,
    lastResponseAt: Date
});

export const Survey = mongoose.model('surveys', surveySchema);

