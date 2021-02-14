import path from 'path';

import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import passport from 'passport';
import bodyParser from 'body-parser';

import authRouter from './routes/authRoutes.js';  
import apiRouter from './routes/apiRoutes.js';  
import usePassport from './services/passport.js';


const app = express();

// Connecting db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => usePassport())
    .catch(error => console.log(error.reason));
mongoose.connection.on('error', err => console.log(err));

// Middlewares
app.use(bodyParser.json());

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRouter);
app.use('/api', apiRouter);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(path.resolve(), 'client', 'build', 'index.html'));
    })
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listen on port ${PORT}`));