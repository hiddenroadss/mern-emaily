import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import passport from 'passport';

import authRouter from './routes/authRoutes.js';
import { mongoURI, cookieKey } from './config/keys.js';
import usePassport from './services/passport.js';


const app = express();

// Connecting db
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => usePassport())
    .catch(error => console.log(error.reason));
mongoose.connection.on('error', err => console.log(err));

// Cookies
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listen on port ${PORT}`));