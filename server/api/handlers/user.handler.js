import User from '../../../models/user';

export const createUser = (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
        fingerprint: req.headers.fingerprint,
    }).then(user => res.send({
        id: user._id,
        username: user.username,
    })).catch(err => res.end(err));
};
