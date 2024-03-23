import qr from 'qrcode';
import Student from '../models/studentModel.js';

const generateQRCode = async () => {
  try {
    // Generate QR code data URL using qrcode library without any specific data
    const qrCodeDataUrl = await qr.toDataURL('Tekisky Portal'); // You can provide any generic data here

    // Return the generated QR code data URL
    return qrCodeDataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};

// Controller to generate QR code
const generateQR = async (req, res) => {
  try {
    // Generate a generic QR code without any specific data
    const qrCodeDataUrl = await generateQRCode();

    // Send response with the generated QR code data URL
    res.json({ qrCodeDataUrl });
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
};


// Controller to update attendance of a student after scanning the QR code
const scanQR = async (req, res) => {
  try {
    const { studentId } = req.body; 

    if (!studentId) {
      return res.status(400).json({ success: false, message: 'Student ID not provided' });
    }
    
    // Update attendance for the scanned student
    const updatedStudent = await updateAttendance(studentId);
    if (!updatedStudent) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    return res.status(200).json({ success: true, message: 'Attendance updated successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating attendance', error: error.message });
  }
};

// Function to update attendance of a student based on the provided student ID
const updateAttendance = async (studentId) => {
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      console.log('Student not found');
      return null;
    }
    // Update attendance record for the student
    // For example, you can add a new attendance record for the current date
    student.attendance.push({ date: new Date(), present: true });
    await student.save();
    console.log('Attendance updated for student:', studentId);
    return student; // Return the updated student document
  } catch (error) {
    console.error('Error updating attendance:', error.message);
    return null;
  }
};

export { generateQR, scanQR };
