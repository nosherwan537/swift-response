export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">About Swift Response</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed">
          The main purpose of this website is to create a real-time, community-driven emergency response system that connects people in need with volunteers, hospitals, shelters, and resources.
          This platform solves the problem of information gaps during disasters (floods, earthquakes, medical emergencies, fires).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg">Nosherwan Tahir</h3>
            <p className="text-gray-500">Team Lead</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg">Muhammad Raza Khan</h3>
            <p className="text-gray-500">Developer</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg">Muhammad Sohaib Akhtar</h3>
            <p className="text-gray-500">Designer</p>
          </div>
        </div>
      </section>
    </div>
  );
}
