import { Router} from 'express';
import { Survey} from '../models/Survey.js';

import requireLogin from '../middlewares/requireLogin.js';
import requireCredits from '../middlewares/requireCredits.js';
import Mailer from '../services/Mailer.js';
import surveyTemplate from '../services/emailTemplates/surveyTemplate.js';


const router = Router();

router.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!');
})

router.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const {title, subject, body, recipients} = req.body;

    const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.split(',').map(email => ({email: email.trim()})),
        _user: req.user.id,
        createdAt: Date.now()
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
        await mailer.send();
        await survey.save();
        req.user.credits -= 1;
        const user = await req.user.save();

        res.send(user);
    } catch(err) {
        res.status(422).send(err);
    }
    
})

export default router;