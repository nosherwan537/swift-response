export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-primary mb-8">About Swift Response</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-dark mb-4">Our Mission</h2>
          <p className="text-medium leading-relaxed text-lg">
            The main purpose of this website is to create a real-time, community-driven emergency response system that connects people in need with volunteers, hospitals, shelters, and resources.
            This platform solves the problem of information gaps during disasters (floods, earthquakes, medical emergencies, fires).
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-dark mb-6">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-secondary p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg text-dark">Nosherwan Tahir</h3>
              <p className="text-medium">Team Lead</p>
            </div>
            <div className="bg-secondary p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg text-dark">Muhammad Raza Khan</h3>
              <p className="text-medium">Developer</p>
            </div>
            <div className="bg-secondary p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg text-dark">Muhammad Sohaib Akhtar</h3>
              <p className="text-medium">Designer</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
