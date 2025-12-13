export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#008C5A] to-[#006B47] text-white py-20 text-center overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-[#FFD700] opacity-10 rounded-full blur-3xl animate-float"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-6xl font-bold mb-4 animate-fade-in-up">About Swift Response</h1>
          <p className="text-xl opacity-95 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '100ms'}}>
            Empowering communities to respond effectively during emergencies
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto py-16 px-4">
        {/* Mission Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-[#333333] mb-6 text-center">Our Mission</h2>
          <div className="glass p-10 rounded-3xl max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              The main purpose of this website is to create a real-time, community-driven emergency response system 
              that connects people in need with volunteers, hospitals, shelters, and resources. This platform solves 
              the problem of information gaps during disasters (floods, earthquakes, medical emergencies, fires) by 
              providing verified, up-to-date information and coordinating rapid response efforts.
            </p>
          </div>
        </section>

        {/* Vision Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-[#333333] mb-6 text-center">Our Vision</h2>
          <div className="glass p-10 rounded-3xl max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              To build a world where no one faces emergencies alone. We envision a future where technology bridges 
              the gap between those in need and those who can help, creating resilient communities that can respond 
              swiftly and effectively to any crisis.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-[#333333] mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🤝',
                title: 'Community First',
                description: 'We believe in the power of community collaboration and mutual support during times of crisis.'
              },
              {
                icon: '⚡',
                title: 'Swift Action',
                description: 'Every second counts in an emergency. We prioritize speed and efficiency in our response systems.'
              },
              {
                icon: '✓',
                title: 'Verified Information',
                description: 'We ensure all information shared on our platform is accurate, verified, and trustworthy.'
              },
              {
                icon: '🌍',
                title: 'Inclusivity',
                description: 'Our platform is accessible to everyone, regardless of background, location, or technical expertise.'
              },
              {
                icon: '🔒',
                title: 'Privacy & Security',
                description: 'We protect user data with the highest security standards while maintaining transparency.'
              },
              {
                icon: '💡',
                title: 'Innovation',
                description: 'We continuously improve our platform using the latest technology to serve communities better.'
              }
            ].map((value, index) => (
              <div 
                key={value.title}
                className="glass p-8 rounded-2xl hover:-translate-y-2 transition-all duration-300 group"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#333333] mb-3 group-hover:text-[#008C5A] transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Who We Serve Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-[#333333] mb-12 text-center">Who We Serve</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: '🆘',
                title: 'People in Need',
                description: 'Individuals and families facing emergencies who need immediate assistance and resources.'
              },
              {
                icon: '👥',
                title: 'Volunteers',
                description: 'Community members who want to make a difference by helping others during crises.'
              },
              {
                icon: '🏥',
                title: 'Healthcare Providers',
                description: 'Hospitals, clinics, and medical professionals coordinating emergency medical response.'
              },
              {
                icon: '🏛️',
                title: 'Organizations & NGOs',
                description: 'Relief organizations and government agencies working to provide aid and support.'
              }
            ].map((audience, index) => (
              <div 
                key={audience.title}
                className="bg-gradient-to-br from-white to-[#F8F9FA] p-8 rounded-2xl border-2 border-[#E9ECEF] hover:border-[#008C5A] hover:shadow-xl transition-all duration-300"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="text-4xl mb-4">{audience.icon}</div>
                <h3 className="text-2xl font-bold text-[#333333] mb-3">{audience.title}</h3>
                <p className="text-gray-600 leading-relaxed">{audience.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-12">
          <h2 className="text-4xl font-bold text-[#333333] mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Nosherwan Tahir', role: 'Team Lead', expertise: 'Project Management' },
              { name: 'Muhammad Raza Khan', role: 'Developer', expertise: 'Full Stack Development' },
              { name: 'Muhammad Sohaib Akhtar', role: 'Designer', expertise: 'UI/UX Design' }
            ].map((member, index) => (
              <div 
                key={member.name}
                className="glass p-8 rounded-2xl text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-[#008C5A] to-[#00A366] rounded-full mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold group-hover:scale-110 transition-transform">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-2xl font-bold text-[#333333] mb-2 group-hover:text-[#008C5A] transition-colors">
                  {member.name}
                </h3>
                <p className="text-[#FFD700] font-semibold mb-2">{member.role}</p>
                <p className="text-gray-600">{member.expertise}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
