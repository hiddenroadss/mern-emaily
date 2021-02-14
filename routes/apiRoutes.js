import { Router } from 'express';
import Stripe from 'stripe';

import authMiddleware from '../middlewares/authMiddleware.js';


const router = Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/stripe', authMiddleware, async (req, res) => {
    const charge = await stripe.charges.create({
        amount: 500,
        currency: 'usd',
        description: '$5 for 5 credits',
        source: req.body.id
    });

    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
});

export default router;
