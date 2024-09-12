// app/help/docs/api-reference/authentication.tsx

import React from 'react';

const Authentication: React.FC = () => {
  return (
    <div>
      <h1>API Authentication</h1>
      <p>To use the QRTraffic API, you'll need to authenticate your requests. Here's how:</p>
      <ol>
        <li>Obtain your API key from the dashboard</li>
        <li>Include the API key in the header of each request</li>
        <li>Use HTTPS for all API calls</li>
      </ol>
      {/* Add more detailed authentication instructions */}
    </div>
  );
};

export default Authentication;