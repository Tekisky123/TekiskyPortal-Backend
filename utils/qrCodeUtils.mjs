import qr from 'qrcode';

// Function to generate QR code data URL from the provided data
const generateQRCode = async (data) => {
  const dataAsString = JSON.stringify(data); // Convert data to string if it's not already

  try {
    // Generate QR code data URL using qrcode library
    const qrCodeDataUrl = await qr.toDataURL(dataAsString);

    // Return the generated QR code data URL
    return qrCodeDataUrl;

  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};

// Export the generateQRCode function
export { generateQRCode };
