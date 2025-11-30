export default function RequestHelpPage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Request Emergency Help</h1>
      <p className="mb-8 text-gray-600">Please provide details about the emergency. This information will be shared with volunteers.</p>
      
      <form className="space-y-6 bg-white p-8 rounded-xl shadow-md border border-red-100">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Type</label>
          <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500">
            <option>Medical</option>
            <option>Fire</option>
            <option>Flood</option>
            <option>Rescue</option>
            <option>Other</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location (Address/Description)</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" placeholder="123 Main St, near City Park" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" rows={4} placeholder="Describe the situation..."></textarea>
        </div>

        <button type="submit" className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors">
          Submit Request
        </button>
      </form>
    </div>
  );
}
