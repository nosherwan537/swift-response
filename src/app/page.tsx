import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <section className="max-w-3xl space-y-6">
        <h1 className="text-5xl font-bold text-primary">
          Community Emergency Response
        </h1>
        <p className="text-xl text-gray-600">
          Connecting people in need with volunteers and resources during emergencies.
          Real-time updates, verified resources, and community support.
        </p>
        
        <div className="flex gap-4 justify-center mt-8">
          <Link 
            href="/requests/create"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors text-lg"
          >
            I Need Help
          </Link>
          <Link 
            href="/volunteer"
            className="bg-primary hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors text-lg"
          >
            I Can Help
          </Link>
        </div>
      </section>

      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Real-time Alerts</h3>
          <p className="text-gray-600">Get instant notifications about emergencies in your area.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Resource Map</h3>
          <p className="text-gray-600">Find nearby shelters, hospitals, and supplies on our interactive map.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Verified Volunteers</h3>
          <p className="text-gray-600">Connect with registered volunteers and NGOs ready to assist.</p>
        </div>
      </section>
    </div>
  );
}
