import Todo from '../../../models/todo';

export const getAll = (req, res) => {
    Todo.find({fingerprint: req.headers.fingerprint})
        .then(todos => res.send(todos))
        .catch(err => res.end(err));
};

export const getOne = (req, res) => {
    Todo.findOne({_id: req.params.id, fingerprint: req.headers.fingerprint})
        .then(todo => res.send(todo))
        .catch(err => res.end(err));
};

export const createTodo = (req, res) => {
    Todo.create({
        name: req.body.name,
        description: req.body.description,
        deadline: req.body.deadline,
        fingerprint: req.headers.fingerprint,
    }).then(todo => res.send(todo))
        .catch(err => res.end(err));
};

export const updateTodo = (req, res) => {
    Todo.update({_id: req.body.id, fingerprint: req.headers.fingerprint}, {
        name: req.body.name,
        description: req.body.description,
        deadline: req.body.deadline,
    })
        .then(updated => res.end())
        .catch(err => res.end(err));
};

export const deleteTodo = (req, res) => {
    Todo.remove({_id: req.params.id, fingerprint: req.headers.fingerprint})
        .then(result => {
            res.end()
        })
        .catch(err => res.end(err));
};
