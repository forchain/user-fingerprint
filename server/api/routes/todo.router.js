import Express from 'express'
import * as todoHandler from "../handlers/todo.handler";
import * as userHandler from "../handlers/user.handler";

const router = Express.Router();

router.get('/todo', todoHandler.getAll);
router.get('/todo/:id', todoHandler.getOne);
router.post('/todo', todoHandler.createTodo);
router.put('/todo', todoHandler.updateTodo);
router.delete('/todo/:id', todoHandler.deleteTodo);


router.post('/users', userHandler.createUser);
router.post('/sessions', userHandler.signIn);

module.exports = router;
