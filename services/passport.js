import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';

import { googleClientID, googleClientSecret, facebookClientID, facebookClientSecret } from '../config/keys.js';
import { User } from '../models/User.js';




const usePassport = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id);
        done(null, user);
    });
    
    passport.use(new GoogleStrategy(
        {
        clientID: googleClientID,
        clientSecret: googleClientSecret,
        callbackURL: '/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            let user = await User.findOne({ googleId: profile.id});
            
            if (!user) {
                user = await new User({ googleId: profile.id}).save();
            } 
            done(null, user);
            
            
        }
    ));

    passport.use( new FacebookStrategy(
        {
            clientID: facebookClientID,
            clientSecret: facebookClientSecret,
            callbackURL: '/auth/facebook/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile)
            let user = await User.findOne({ facebookId: profile.id});
            
            if (!user) {
                user = await new User({ facebookId: profile.id}).save();
            } 
            done(null, user);
        }
    ))
};

export default usePassport;