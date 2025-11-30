import Link from "next/link";


export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-white text-gray-900 py-20 text-center border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl font-bold mb-6 leading-tight text-primary">
            Community Emergency Response
          </h1>
          <p className="text-xl mb-10 text-gray-700">
            Connecting people in need with volunteers, hospitals, and resources during emergencies.
            Real-time updates, verified data, and community support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/requests/create"
              className="bg-red-500 text-white hover:bg-red-600 font-bold py-4 px-8 rounded-lg shadow-lg transition-all text-lg"
            >
              Request Urgent Help
            </Link>
            <Link 
              href="/volunteer"
              className="bg-green-500 text-white hover:bg-green-600 font-bold py-4 px-8 rounded-lg shadow-lg transition-all text-lg"
            >
              Join as Volunteer
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl mb-4">
              📢
            </div>
            <h3 className="text-xl font-bold text-dark mb-3">Real-time Alerts</h3>
            <p className="text-medium leading-relaxed">
              Get instant notifications about emergencies in your area. Stay informed and safe with verified updates.
            </p>
          </div>
          
          <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-4">
              🗺️
            </div>
            <h3 className="text-xl font-bold text-dark mb-3">Resource Map</h3>
            <p className="text-medium leading-relaxed">
              Find nearby shelters, hospitals, blood banks, and supplies on our interactive community map.
            </p>
          </div>
          
          <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 text-primary rounded-full flex items-center justify-center text-2xl mb-4">
              🤝
            </div>
            <h3 className="text-xl font-bold text-dark mb-3">Verified Volunteers</h3>
            <p className="text-medium leading-relaxed">
              Connect with registered volunteers and NGOs who are ready to assist. Trustworthy and organized response.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
