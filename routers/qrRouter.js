import express from 'express';
import { generateQR, scanQR } from '../controllers/generateQRController.js';

const QrRouter = express.Router();

QrRouter.get('/generate', generateQR);
QrRouter.post('/scan', scanQR);

export default QrRouter;
