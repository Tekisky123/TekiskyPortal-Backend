import express from 'express';
import { generateQR } from '../controllers/generateQRController.js';

const QrRouter = express.Router();

QrRouter.post('/generate', generateQR);

export default QrRouter;
