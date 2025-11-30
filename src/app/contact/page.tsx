export default function ContactPage() {
    return (
        <div className="max-w-2xl mx-auto py-8">
            <h1 className="text-3xl font-bold text-primary mb-6">Contact Us</h1>
            <p className="mb-8 text-gray-600">Have questions or suggestions? Reach out to our team.</p>

            <form className="space-y-6 bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" rows={4}></textarea>
                </div>

                <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors">
                    Send Message
                </button>
            </form>
        </div>
    );
}
