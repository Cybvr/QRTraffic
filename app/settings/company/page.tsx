export default function CompanySettings() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Company profile</h1>
      <p className="text-gray-600 mb-8">Update your company photo and details here.</p>

      <form className="space-y-6 max-w-2xl">
        <div>
          <label htmlFor="public-profile" className="block text-sm font-medium text-gray-700">Public profile</label>
          <p className="text-sm text-gray-500">This will be displayed on your profile.</p>
          <input type="text" id="public-profile" name="public-profile" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" defaultValue="QR Traffic UI" />
        </div>

        <div>
          <label htmlFor="profile-url" className="block text-sm font-medium text-gray-700">Profile URL</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              qrtraffic.com/profile/
            </span>
            <input type="text" id="profile-url" name="profile-url" className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 border-gray-300" defaultValue="QR Traffic" />
          </div>
        </div>

        <div>
          <label htmlFor="tagline" className="block text-sm font-medium text-gray-700">Tagline</label>
          <p className="text-sm text-gray-500">A quick snapshot of your company.</p>
          <textarea id="tagline" name="tagline" rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" defaultValue="QR Traffic UI is the ultimate Figma UI kit and design system to kickstart any project, startup, or freelance designer." />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Company logo</label>
          <p className="text-sm text-gray-500">Update your company logo and then choose where you want it to display.</p>
          <div className="mt-1 flex items-center">
            <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
              <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
            <button type="button" className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Change
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">Branding</h3>
          <p className="mt-1 text-sm text-gray-500">Add your logo to reports and emails.</p>
          <div className="mt-2 space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input id="reports" name="reports" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="reports" className="font-medium text-gray-700">Reports</label>
                <p className="text-gray-500">Include my logo in summary reports.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input id="emails" name="emails" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="emails" className="font-medium text-gray-700">Emails</label>
                <p className="text-gray-500">Include my logo in customer emails.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Cancel
          </button>
          <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save
          </button>
        </div>
      </form>
    </div>
  )
}