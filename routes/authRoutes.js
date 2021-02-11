import { Router } from 'express';
import passport from 'passport';


const router = Router();

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google'), 
    (req, res) => {
        res.redirect('/survey');
    });

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/'}),
    (req, res) => {
        res.redirect('/survey');
    }
)

router.get('/logout', (req, res) => {
    req.logout();
    res.send(req.user);
})

router.get('/current-user', (req, res) => {
    res.send(req.user);
});

export default router;