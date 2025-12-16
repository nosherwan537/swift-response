'use client';

import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import SafetyVideosSection from "@/components/SafetyVideosSection";
import {
  Waves,
  Home as HomeIcon,
  Flame,
  Stethoscope,
  Car,
  Package,
  LifeBuoy,
  AlertTriangle,
  Bell,
  Map,
  Users
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section - Two Column Layout */}
      <section className="relative bg-gradient-to-br from-[#008C5A] to-[#006B47] text-white overflow-hidden">
        {/* Decorative floating elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#7dd3fc] opacity-10 rounded-full blur-3xl animate-float hidden md:block"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#34d399] opacity-10 rounded-full blur-3xl" style={{ animation: 'float 5s ease-in-out infinite' }}></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[700px] py-16 lg:py-20">
            
            {/* Left Column - Text and Buttons */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up tracking-tight">
                Swift Response
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl mb-12 opacity-95 animate-fade-in-up max-w-2xl mx-auto lg:mx-0 font-light" style={{ animationDelay: '100ms' }}>
                Connecting communities during emergencies
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                {/* Report Emergency Button with Tooltip */}
                <div className="relative group">
                  <Link
                    href="/requests/create"
                    className="block bg-[#ef4444] text-white hover:bg-[#dc2626] font-semibold py-4 px-10 sm:px-12 rounded-xl shadow-lg transition-all duration-300 text-lg hover:-translate-y-1 hover:shadow-xl active:scale-95"
                  >
                    <span className="inline-block group-hover:scale-105 transition-transform">Report Emergency</span>
                  </Link>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                    <div className="bg-white text-gray-800 rounded-lg px-4 py-3 shadow-xl max-w-xs border border-gray-100">
                      <p className="font-bold mb-1 text-sm text-red-600">Report Emergency</p>
                      <p className="text-xs text-gray-500 leading-relaxed">Quickly alert the community about an emergency situation.</p>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                        <div className="w-3 h-3 bg-white rotate-45 border-r border-b border-gray-100"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Become a Volunteer Button with Tooltip */}
                <div className="relative group">
                  <Link
                    href="/volunteer"
                    className="block bg-[#fbbf24] text-[#1f2937] hover:bg-[#f59e0b] font-semibold py-4 px-10 sm:px-12 rounded-xl shadow-lg transition-all duration-300 text-lg hover:-translate-y-1 hover:shadow-xl active:scale-95"
                  >
                    <span className="inline-block group-hover:scale-105 transition-transform">Become a Volunteer</span>
                  </Link>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                    <div className="bg-white text-gray-800 rounded-lg px-4 py-3 shadow-xl max-w-xs border border-gray-100">
                      <p className="font-bold mb-1 text-sm text-amber-600">Become a Volunteer</p>
                      <p className="text-xs text-gray-500 leading-relaxed">Join our community of heroes! Help people in need.</p>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                        <div className="w-3 h-3 bg-white rotate-45 border-r border-b border-gray-100"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Visual Composition with Circle and Cards */}
            <div className="relative h-[600px] w-full hidden lg:block">
              {/* Orbit Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border-2 border-white/20 rounded-full"></div>
              
              {/* Card 1 - Top Right (Active Alerts) */}
              <div className="absolute top-[8%] right-[8%] p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl animate-float w-64 z-20" style={{animationDelay: '0s'}}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[#FFD700] text-sm font-semibold uppercase tracking-wider">Alerts</span>
                    <h3 className="text-3xl font-bold text-white mt-1">Active</h3>
                  </div>
                  <div className="p-3 bg-red-500/20 rounded-xl">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">12</span>
                  <span className="text-[#FFD700] font-medium text-sm bg-[#FFD700]/10 px-2 py-0.5 rounded">+2 new</span>
                </div>
              </div>

              {/* Card 2 - Left (Volunteers) */}
              <div className="absolute top-1/2 -translate-y-1/2 left-[2%] p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl animate-float w-56 z-10" style={{animationDelay: '1.5s'}}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[#FFD700] text-xs font-semibold uppercase tracking-wider">Volunteers</span>
                  </div>
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">540</span>
                  <span className="text-[#90EE90] font-medium text-xs">+12%</span>
                </div>
              </div>

              {/* Card 3 - Bottom Right (Response) */}
              <div className="absolute bottom-[8%] right-[15%] p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl animate-float w-48 z-30" style={{animationDelay: '0.8s'}}>
                 <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-[#FFD700] text-xs font-semibold uppercase tracking-wider">Response</span>
                  </div>
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Bell className="w-5 h-5 text-yellow-400" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">~5m</span>
                  <span className="text-[#90EE90] font-medium text-xs">-1m</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* Impact Stats Bar */}
      <section className="bg-white py-20 sm:py-24 border-b border-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-16 tracking-tight">Our Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { value: '500+', label: 'Volunteers Joined' },
              { value: '1000+', label: 'Lives Saved' },
              { value: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-8 rounded-2xl hover:bg-gray-50 transition-all duration-300 cursor-default"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-5xl font-bold text-[#008C5A] mb-3">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 sm:py-24 bg-[#fafafa]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4 tracking-tight">How It Works</h2>
          <p className="text-center text-gray-500 mb-16 text-lg max-w-2xl mx-auto px-4">
            Our streamlined process ensures rapid response during emergencies
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              { step: 1, title: 'Report', desc: 'Quickly provide details and location of the emergency.' },
              { step: 2, title: 'Verify', desc: 'Our system validates requests and connects resources.' },
              { step: 3, title: 'Resolve', desc: 'Volunteers and responders provide immediate support.' }
            ].map((item, index) => (
              <div
                key={item.step}
                className="text-center group relative"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gray-200 -z-10 md:hidden last:hidden"></div>
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-white text-[#008C5A] border-2 border-[#008C5A] rounded-full flex items-center justify-center text-2xl font-bold shadow-sm z-10">
                    {item.step}
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 left-full w-full h-px bg-gray-200 -translate-y-1/2 z-0"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed px-4">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Categories Section */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4 tracking-tight">Emergency Categories</h2>
          <p className="text-center text-gray-500 mb-16 text-lg max-w-2xl mx-auto px-4">
            We provide assistance across all types of emergencies
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { name: 'Floods', icon: Waves, color: 'text-blue-500', bg: 'bg-blue-50', desc: 'Water-related disasters including floods.' },
              { name: 'Earthquakes', icon: HomeIcon, color: 'text-amber-600', bg: 'bg-amber-50', desc: 'Seismic activities and building collapses.' },
              { name: 'Fires', icon: Flame, color: 'text-red-500', bg: 'bg-red-50', desc: 'Fire emergencies and incidents.' },
              { name: 'Medical', icon: Stethoscope, color: 'text-emerald-500', bg: 'bg-emerald-50', desc: 'Medical emergencies and health crises.' },
              { name: 'Accidents', icon: Car, color: 'text-purple-500', bg: 'bg-purple-50', desc: 'Traffic and workplace accidents.' },
              { name: 'Supplies', icon: Package, color: 'text-indigo-500', bg: 'bg-indigo-50', desc: 'Emergency supplies and resource distribution.' },
              { name: 'Rescue', icon: LifeBuoy, color: 'text-orange-500', bg: 'bg-orange-50', desc: 'Search and rescue operations.' },
              { name: 'Other', icon: AlertTriangle, color: 'text-gray-500', bg: 'bg-gray-50', desc: 'Other emergency situations.' }
            ].map((cat, index) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.name}
                  className="group relative p-6 bg-white rounded-xl text-center border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center ${cat.bg} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 ${cat.color}`} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">{cat.name}</span>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                    <div className="bg-gray-900 text-white rounded-lg px-3 py-2 shadow-xl max-w-[200px] text-center">
                      <p className="text-xs leading-relaxed">{cat.desc}</p>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                        <div className="w-2 h-2 bg-gray-900 rotate-45"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 sm:py-24 bg-[#fafafa] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4 tracking-tight">Key Features</h2>
          <p className="text-center text-gray-500 mb-16 text-lg max-w-2xl mx-auto px-4">
            Powerful tools to ensure effective emergency response
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Bell, title: 'Real-time Alerts', desc: 'Get instant notifications about emergencies in your area with verified updates' },
              { icon: Map, title: 'Interactive Map', desc: 'Find nearby shelters, hospitals, and resources on our community map' },
              { icon: Users, title: 'Verified Volunteers', desc: 'Connect with registered volunteers and NGOs ready to assist' }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-emerald-100 hover:shadow-lg transition-all duration-300 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#008C5A] transition-colors duration-300">
                    <Icon className="w-6 h-6 text-[#008C5A] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Safety Videos Section */}
      <SafetyVideosSection />

      {/* Contact Section */}
      <section className="py-20 sm:py-24 bg-[#fafafa]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Get in Touch</h2>
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
              Have questions or need help? Send us a message.
            </p>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative bg-[#008C5A] text-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-24 sm:py-32">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">Ready to Make a Difference?</h2>
          <p className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto opacity-90 px-4 font-light">
            Join our community today and help save lives during emergencies
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link
              href="/requests/create"
              className="group bg-white text-[#008C5A] hover:bg-gray-100 font-semibold py-4 px-10 rounded-xl shadow-lg transition-all duration-300 text-base"
            >
              Report Emergency
            </Link>
            <Link
              href="/volunteer"
              className="group bg-transparent border border-white text-white hover:bg-white hover:text-[#008C5A] font-semibold py-4 px-10 rounded-xl transition-all duration-300 text-base"
            >
              Become a Volunteer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
