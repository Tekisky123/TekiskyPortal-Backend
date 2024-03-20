import qr from 'qrcode';


const generateQRCode = async (data) => {
  try {
    // Generate the QR code
    const qrCodeDataUrl = await qr.toDataURL(data);
    return qrCodeDataUrl;
  } catch (error) {
    throw new Error('Failed to generate QR code');
  }
};

export { generateQRCode };