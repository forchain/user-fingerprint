import Todo from '../../../models/todo';

export const getAll = (req, res) => {
    Todo.find({userid: req.headers.userid})
        .then(todos => res.send(todos))
        .catch(err => res.end(err));
};

export const getOne = (req, res) => {
    Todo.findOne({_id: req.params.id, userid: req.headers.userid})
        .then(todo => res.send(todo))
        .catch(err => res.end(err));
};

export const createTodo = (req, res) => {
    const userid = req.headers.userid;
    Todo.create({
        name: req.body.name,
        description: req.body.description,
        deadline: req.body.deadline,
        userid: userid,
    }).then(todo => res.send(todo))
        .catch(err => res.end(err));
};

export const updateTodo = (req, res) => {
    Todo.update({_id: req.body.id, userid: req.headers.userid}, {
        name: req.body.name,
        description: req.body.description,
        deadline: req.body.deadline,
    })
        .then(updated => res.end())
        .catch(err => res.end(err));
};

export const deleteTodo = (req, res) => {
    Todo.remove({_id: req.params.id, userid: req.headers.userid})
        .then(result => {
            res.end()
        })
        .catch(err => res.end(err));
};

