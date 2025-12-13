'use client';

import { useState } from 'react';

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    availability: 'Weekends'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for registering as a volunteer! We will contact you soon.');
    setFormData({ name: '', email: '', phone: '', skills: '', availability: 'Weekends' });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#008C5A] to-[#006B47] text-white py-20 text-center overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-[#FFD700] opacity-10 rounded-full blur-3xl animate-float"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-6xl font-bold mb-4 animate-fade-in-up">Become a Volunteer</h1>
          <p className="text-xl opacity-95 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '100ms'}}>
            Join our network of heroes and make a real difference in your community
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto py-16 px-4">
        {/* Why Volunteer Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-[#333333] mb-12 text-center">Why Volunteer?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '❤️',
                title: 'Make an Impact',
                description: 'Directly help people in need during their most vulnerable moments'
              },
              {
                icon: '🎓',
                title: 'Gain Skills',
                description: 'Receive training and develop valuable emergency response skills'
              },
              {
                icon: '🏆',
                title: 'Get Recognized',
                description: 'Become a certified responder with official recognition'
              },
              {
                icon: '🤝',
                title: 'Build Network',
                description: 'Connect with NGOs, professionals, and like-minded volunteers'
              }
            ].map((benefit, index) => (
              <div 
                key={benefit.title}
                className="glass p-8 rounded-2xl text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-3 group-hover:text-[#008C5A] transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Available Roles Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-[#333333] mb-12 text-center">Available Roles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🏥',
                title: 'Medical Assistance',
                description: 'Doctors, nurses, and paramedics needed to provide first aid and urgent care',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: '📦',
                title: 'Logistics Support',
                description: 'Help with transporting supplies, coordinating shelter, and managing resources',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: '🆘',
                title: 'Field Operations',
                description: 'Search and rescue operations, clearing debris, and on-ground assistance',
                color: 'from-orange-500 to-amber-500'
              }
            ].map((role, index) => (
              <div 
                key={role.title}
                className="relative bg-gradient-to-br from-white to-[#F8F9FA] p-8 rounded-2xl border-2 border-[#E9ECEF] hover:border-[#008C5A] hover:shadow-xl transition-all duration-300 overflow-hidden group"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-4">{role.icon}</div>
                  <h3 className="text-2xl font-bold text-[#333333] mb-3">{role.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{role.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Registration Form Section */}
        <section className="mb-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-[#333333] mb-6 text-center">Join Us Today</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Fill out the form below to register as a volunteer. We'll contact you with next steps.
            </p>

            <form onSubmit={handleSubmit} className="glass p-10 rounded-3xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008C5A] focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008C5A] focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008C5A] focus:border-transparent transition-all"
                  placeholder="+92 300 1234567"
                />
              </div>

              {/* Skills */}
              <div>
                <label htmlFor="skills" className="block text-sm font-bold text-gray-700 mb-2">
                  Skills & Expertise *
                </label>
                <textarea
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008C5A] focus:border-transparent transition-all resize-none"
                  placeholder="e.g., First Aid, Medical Training, Logistics, Communication..."
                />
              </div>

              {/* Availability */}
              <div>
                <label htmlFor="availability" className="block text-sm font-bold text-gray-700 mb-2">
                  Availability *
                </label>
                <select
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008C5A] focus:border-transparent transition-all"
                >
                  <option value="Weekdays">Weekdays</option>
                  <option value="Weekends">Weekends</option>
                  <option value="Anytime">Anytime</option>
                  <option value="Emergency Only">Emergency Only</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#008C5A] to-[#00A366] text-white font-bold py-4 px-8 rounded-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 text-lg"
              >
                🤝 Register as Volunteer
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
