'use client';

import { useState } from 'react';

export default function AboutPage() {
  const [formData, setFormData] = useState({ email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! We will get back to you soon.');
    setFormData({ email: '', message: '' });
  };

  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Enhanced Header with Gradient Background */}
      <div className="relative bg-gradient-to-br from-[#008C5A] via-[#00A366] to-[#006B47] py-20 px-4 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD700] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-in-up">About Swift Response</h1>
          <div className="w-24 h-1 bg-[#FFD700] rounded-full"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-20">
        {/* Mission Section with Enhanced Card */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <span className="w-2 h-10 bg-gradient-to-b from-[#008C5A] to-[#00A366] rounded-full"></span>
            Our Mission
          </h2>
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#008C5A] to-[#00A366] opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity"></div>
            <p className="text-gray-700 leading-relaxed text-lg relative z-10">
              Swift Response is dedicated to enhancing community safety and resilience through rapid, coordinated emergency 
              response. Our platform empowers individuals to report incidents swiftly, access vital resources, and collaborate effectively 
              during crises. We strive to build a network where every member can contribute to a safer environment for all.
            </p>
          </div>
        </section>

        {/* Values Section with Enhanced Cards */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 flex items-center gap-3">
            <span className="w-2 h-10 bg-gradient-to-b from-[#008C5A] to-[#00A366] rounded-full"></span>
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🛡️',
                title: 'Safety First',
                description: 'Prioritizing the safety and well-being of individuals and communities.',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: '👥',
                title: 'Community Collaboration',
                description: 'Fostering a collaborative spirit where every member can contribute.',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: '⚡',
                title: 'Rapid Action',
                description: 'Ensuring swift and effective responses to emergencies.',
                gradient: 'from-orange-500 to-red-500'
              }
            ].map((value, index) => (
              <div 
                key={value.title} 
                className="group bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-[#008C5A] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{value.icon}</div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-[#008C5A] transition-colors">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section with Enhanced Avatars */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 flex items-center gap-3">
            <span className="w-2 h-10 bg-gradient-to-b from-[#008C5A] to-[#00A366] rounded-full"></span>
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { name: 'Nosherwan Tahir', role: 'Team Lead', initials: 'NT', color: 'from-[#008C5A] to-[#00A366]' },
              { name: 'Muhammad Raza Khan', role: 'Full Stack Developer', initials: 'MR', color: 'from-[#FFD700] to-[#F4B942]' },
              { name: 'Muhammad Sohaib Akhtar', role: 'UI/UX Designer and Developer', initials: 'MS', color: 'from-[#008C5A] to-[#00A366]' }
            ].map((member, index) => (
              <div 
                key={member.name} 
                className="text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative inline-block mb-6">
                  <div className={`w-36 h-36 mx-auto rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}>
                    <span className="text-white text-4xl font-bold">{member.initials}</span>
                  </div>
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}></div>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-[#008C5A] transition-colors">{member.name}</h3>
                <p className="text-gray-600 text-sm font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* History Section with Enhanced Timeline */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 flex items-center gap-3">
            <span className="w-2 h-10 bg-gradient-to-b from-[#008C5A] to-[#00A366] rounded-full"></span>
            Our Journey
          </h2>
          <div className="space-y-8 relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#008C5A] to-[#00A366] hidden md:block"></div>
            
            {[
              {
                icon: '🚀',
                year: '2025',
                title: 'Platform Idea',
                description: 'Swift Response was envisioned to transform community emergency response.',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: '📍',
                year: '2026',
                title: 'Platform Launch',
                description: 'Swift Response will be launched with a vision to transform community emergency response.',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: '👥',
                year: '2026',
                title: '100,000+ Users',
                description: 'We will reach a milestone of over 100,000 users, reflecting our growing impact.',
                color: 'from-orange-500 to-red-500'
              }
            ].map((milestone, index) => (
              <div 
                key={milestone.year} 
                className="flex gap-6 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0 relative">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${milestone.color} flex items-center justify-center text-2xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 relative z-10`}>
                    {milestone.icon}
                  </div>
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${milestone.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300`}></div>
                </div>
                <div className="flex-1 bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-[#008C5A] font-bold text-lg">{milestone.year}</span>
                    <span className="font-bold text-gray-900 text-lg">{milestone.title}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section with Enhanced Form */}
        <section className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <span className="w-2 h-10 bg-gradient-to-b from-[#008C5A] to-[#00A366] rounded-full"></span>
            Contact Us
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-3">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                placeholder="Enter your email"
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#008C5A] focus:border-[#008C5A] transition-all bg-white shadow-sm hover:shadow-md"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-3">
                Your Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                required
                rows={6}
                placeholder="Enter your message"
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#008C5A] focus:border-[#008C5A] transition-all resize-none bg-white shadow-sm hover:shadow-md"
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#008C5A] to-[#00A366] hover:from-[#006B47] hover:to-[#008C5A] text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95"
            >
              Send Message
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
