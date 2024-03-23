import express from 'express';
const studentRouter=express.Router();
import {createStudent,getAllStudents,deleteStudent,updateStudent,getOneStudent} from '../controllers/studentController.js'

studentRouter.post('/create',createStudent)
studentRouter.get('/getstudent',getAllStudents)
studentRouter.put('/edit/:id',updateStudent)
studentRouter.get('/delete/:id',deleteStudent)
studentRouter.get('/getOneStudent/:id',getOneStudent)



export default studentRouter