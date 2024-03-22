import studentModel from "../models/studentModel.js";

const createStudent = async (req, res) => {
    console.log(req.body);
    const newStudent = new studentModel(req.body);
    
    try {
        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });  
    }
};

const getAllStudents = async (req, res) => {
    try {
        console.log("req user" , req.user);
        const students = await studentModel.find();
        console.log(students);

        if (students.length === 0) {
            return res.status(404).json({
                success: false, 
                message: 'No Students Found',
            });
        }

        return res.status(200).json({
            success: true,
            result: students,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error while fetching students',
            error: error.message,
        });
    }
};

const deleteStudent = async (req, res) => {
    const _id = req.params.id;
    try {
        const deletedStudent = await studentModel.findByIdAndDelete(_id);
        if (!deletedStudent) {
            return res.status(404).json({
                success: false,
                message: 'Invalid Student ID',
            });
        }
        res.json({
            success: true,
            message: 'Student Deleted Successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting student',
            error: error.message,
        });
    }
};

const updateStudent = async (req, res) => {
    const _id = req.params.id;
    try {
        const updatedStudent = await studentModel.findByIdAndUpdate(_id, req.body, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({
                success: false,
                message: 'Invalid Student ID',
            });
        }
        res.json({
            success: true,
            message: 'Student Updated Successfully',
            student: updatedStudent,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating student',
            error: error.message,
        });
    }
};

const getOneStudent = async (req, res) => {
    const _id = req.params.id;
    try {
        const student = await studentModel.findById(_id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found',
            });
        }
        res.json({
            success: true,
            student: student,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error getting student',
            error: error.message,
        });
    }
};

const updateAttendance = async (studentId) => {
    try {
        const student = await studentModel.findById(studentId);
        if (!student) {
            console.log('Student not found');
            return;
        }
        // Update attendance record for the student
        // For example, you can add a new attendance record for the current date
        student.attendance.push({ date: new Date(), present: true });
        await student.save();
        console.log('Attendance updated for student:', studentId);
    } catch (error) {
        console.error('Error updating attendance:', error.message);
    }
};

export { createStudent, getAllStudents, deleteStudent, updateStudent, updateAttendance,getOneStudent };
