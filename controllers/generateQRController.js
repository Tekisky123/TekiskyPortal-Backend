import { generateQRCode } from '../utils/qrCodeUtils.mjs';
import Student from '../models/studentModel.js'; 

const generateQR = async (req, res) => {
  try {
    const { data } = req.body;
    const qrCodeDataUrl = await generateQRCode(data);
    
    const student = await Student.findOneAndUpdate({ qrCodeData: data }, { $set: { attendance: true } }, { new: true });
    
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ qrCodeDataUrl, student });
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
};

export { generateQR };
