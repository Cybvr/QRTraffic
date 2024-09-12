// app/help/docs/api-reference/endpoints.tsx

import React from 'react';

const Endpoints: React.FC = () => {
  return (
    <div>
      <h1>API Endpoints</h1>
      <p>QRTraffic offers the following API endpoints:</p>
      <ul>
        <li>
          <strong>/qr/generate</strong> - Generate a new QR code
        </li>
        <li>
          <strong>/qr/update</strong> - Update an existing QR code
        </li>
        <li>
          <strong>/analytics/get</strong> - Retrieve analytics data
        </li>
        {/* Add more endpoints */}
      </ul>
      {/* Include details about request/response formats, parameters, etc. */}
    </div>
  );
};

export default Endpoints;