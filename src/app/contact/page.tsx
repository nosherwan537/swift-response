export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-primary mb-4">Contact Us</h1>
        <p className="mb-8 text-medium text-lg">Have questions or suggestions? Reach out to our team.</p>
        
        <form className="space-y-6 bg-secondary p-8 rounded-xl shadow-sm border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-dark mb-2">Name</label>
            <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-dark mb-2">Email</label>
            <input type="email" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary" />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-2">Message</label>
            <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary" rows={5}></textarea>
          </div>

          <button type="submit" className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors">
            Send Message
          </button>
            </form>
        </div>
    </div>
  );
}
