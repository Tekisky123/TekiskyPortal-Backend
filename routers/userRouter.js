import express from 'express'
const userRouter=express.Router();
import { createUser ,login,updateUsers,getUser,deleteUser,getOneUser} from '../controllers/userController.js';

userRouter.post('/create',createUser);
userRouter.post('/login',login);
userRouter.post('/:id',updateUsers);
userRouter.get('/getuser',getUser);
userRouter.get('/:id',deleteUser);
userRouter.get('/getOneUser/:id',getOneUser)


export default userRouter;