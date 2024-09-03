'use client';

import React, { useState } from 'react';

interface Domain {
  id: string;
  name: string;
  status: 'active' | 'pending' | 'error';
}

const DomainList: React.FC<{ domains: Domain[] }> = ({ domains }) => {
  return (
    <ul className="divide-y divide-gray-200">
      {domains.map((domain) => (
        <li key={domain.id} className="py-4 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-900">{domain.name}</p>
            <p className="text-sm text-gray-500">{domain.status}</p>
          </div>
          <button className="text-indigo-600 hover:text-indigo-900">Remove</button>
        </li>
      ))}
    </ul>
  );
};

const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
        />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-gray-900">No domains</h3>
      <p className="mt-1 text-sm text-gray-500">Get started by adding a new domain.</p>
    </div>
  );
};

export default function DomainsSettings() {
  const [domains, setDomains] = useState<Domain[]>([]);

  const addDomain = () => {
    // This function would typically open a modal or form to add a new domain
    console.log('Add domain clicked');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Custom Domains ({domains.length})</h1>
          <p className="text-gray-600">Add your own Custom Domain to boost trust and engagement in your brand. How do I set this up?</p>
        </div>
        <button
          onClick={addDomain}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Custom Domain
        </button>
      </div>

      {domains.length > 0 ? <DomainList domains={domains} /> : <EmptyState />}
    </div>
  );
}