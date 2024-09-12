// app/help/docs/getting-started/qr-code-types.tsx

import React from 'react';

const QRCodeTypes: React.FC = () => {
  return (
    <div>
      <h1>QR Code Types</h1>
      <p>QRTraffic offers a wide range of QR code solutions:</p>
      <ul>
        <li>Link QR Code Generator</li>
        <li>VCard QR Code Generator</li>
        <li>QR Code Menu Generator for Restaurants</li>
        <li>Facebook QR Code Generator</li>
        <li>PDF QR Code Generator</li>
        {/* Add more QR code types */}
      </ul>
    </div>
  );
};

export default QRCodeTypes;