const requireCredits = (req, res, next) => {
    if (!req.user.crefits < 1) {
        res.status(403).send({error: 'Not enough credits'});
    }

    next();
}

export default requireCredits;