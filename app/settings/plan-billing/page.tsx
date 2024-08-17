export default function DomainsSettings() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Custom Domains (0)</h1>
          <p className="text-gray-600">Add your own Custom Domain to boost trust and engagement in your brand. How do I set this up?</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
          Add Custom Domain
        </button>
      </div>

      {/* Add domain list or empty state here */}
    </div>
  )
}