import User from '../../../models/user';

export const createUser = (req, res) => {
    User.findOne({username: req.body.username})
        .then(user => {
            if (user) {
                res.send({code: 1}) // registered
            } else {
                User.create({
                    username: req.body.username,
                    password: req.body.password,
                    fingerprint: req.body.fingerprint,
                }).then(user => res.send({
                    id: user._id,
                    username: user.username,
                })).catch(err => res.end(err));
            }
        }).catch(err => res.end(err));

};

export const signIn = (req, res) => {
    User.findOne({
        username: req.body.username,
        password: req.body.password,
    }).then(user => {
            if (user) {
                res.send({
                        user: {
                            id: user._id,
                            username: user.username,
                            fingerprint: user.fingerprint,
                        },
                        code: 0
                    },
                )
            } else {
                res.send({
                    code: 1
                })
            }
        }
    ).catch(err => res.end(err));
};
