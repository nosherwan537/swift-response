'use client';

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section - Compact and Impactful */}
      <section className="relative bg-gradient-to-br from-[#008C5A] to-[#006B47] text-white overflow-hidden pt-8">
        {/* Decorative floating elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#FFD700] opacity-10 rounded-full blur-3xl animate-float hidden md:block"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#00A366] opacity-10 rounded-full blur-3xl" style={{animation: 'float 5s ease-in-out infinite'}}></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10 text-center py-24 sm:py-32 lg:py-40">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight animate-fade-in-up">
            Swift Response
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl mb-12 opacity-95 animate-fade-in-up max-w-3xl mx-auto px-4" style={{animationDelay: '100ms'}}>
            Connecting communities during emergencies
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up px-4" style={{animationDelay: '200ms'}}>
            {/* Report Emergency Button with Tooltip */}
            <div className="relative group">
              <Link 
                href="/requests/create"
                className="block bg-[#DC3545] text-white hover:bg-red-700 font-bold py-4 px-10 sm:px-12 rounded-xl shadow-2xl transition-all duration-300 text-lg hover:-translate-y-1 hover:shadow-3xl active:scale-95"
              >
                <span className="inline-block group-hover:scale-105 transition-transform">Report Emergency</span>
              </Link>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                <div className="bg-gradient-to-br from-[#008C5A] to-[#006B47] text-white rounded-xl px-5 py-4 shadow-2xl max-w-sm border border-[#00A366]">
                  <p className="font-bold mb-2 text-base">Report Emergency</p>
                  <p className="text-sm text-gray-100 leading-relaxed">Quickly alert the community about an emergency situation and get immediate help from nearby volunteers and responders.</p>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-2">
                    <div className="w-4 h-4 bg-[#008C5A] rotate-45 border-r border-b border-[#00A366]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Become a Volunteer Button with Tooltip */}
            <div className="relative group">
              <Link 
                href="/volunteer"
                className="block bg-[#FFD700] text-[#333333] hover:bg-[#F4B942] font-bold py-4 px-10 sm:px-12 rounded-xl shadow-2xl transition-all duration-300 text-lg hover:-translate-y-1 hover:shadow-3xl active:scale-95"
              >
                <span className="inline-block group-hover:scale-105 transition-transform">Become a Volunteer</span>
              </Link>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                <div className="bg-gradient-to-br from-[#FFD700] to-[#F4B942] text-gray-900 rounded-xl px-5 py-4 shadow-2xl max-w-sm border border-[#FFE066]">
                  <p className="font-bold mb-2 text-base">Become a Volunteer</p>
                  <p className="text-sm text-gray-800 leading-relaxed">Join our community of heroes! Help people in need during emergencies and make a real difference in your community.</p>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-2">
                    <div className="w-4 h-4 bg-[#FFD700] rotate-45 border-r border-b border-[#FFE066]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Bar */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-[#333333] mb-16">Our Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { value: '500+', label: 'Volunteers Joined' },
              { value: '1000+', label: 'Lives Saved' },
              { value: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="glass text-center p-8 rounded-2xl hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl active:scale-95 cursor-pointer"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="text-6xl font-bold gradient-text mb-4">{stat.value}</div>
                <div className="text-base text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-white to-[#F8F9FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-[#333333] mb-4">How It Works</h2>
          <p className="text-center text-gray-600 mb-16 text-lg max-w-2xl mx-auto px-4">
            Our streamlined process ensures rapid response during emergencies
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              { step: 1, title: 'Report Emergency', desc: 'Quickly provide details and location of the emergency to alert the community' },
              { step: 2, title: 'Get Verified Help', desc: 'Our system validates requests and connects you with nearby resources' },
              { step: 3, title: 'Help Arrives', desc: 'Volunteers and first responders coordinate to provide immediate support' }
            ].map((item, index) => (
              <div 
                key={item.step}
                className="text-center group"
                style={{animationDelay: `${index * 150}ms`}}
              >
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#008C5A] to-[#00A366] text-white rounded-2xl flex items-center justify-center text-4xl font-bold shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 active:scale-95">
                    {item.step}
                  </div>
                  <div className="absolute -inset-2 bg-[#008C5A] opacity-20 rounded-2xl blur-xl group-hover:opacity-30 transition-opacity"></div>
                </div>
                <h3 className="text-2xl font-bold text-[#333333] mb-4">{item.title}</h3>
                <p className="text-base text-gray-600 leading-relaxed px-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Categories Section */}
      <section className="py-20 sm:py-24 bg-white z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-[#333333] mb-4">Emergency Categories</h2>
          <p className="text-center text-gray-600 mb-16 text-lg max-w-2xl mx-auto px-4">
            We provide assistance across all types of emergencies
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { name: 'Floods', icon: '🌊', color: 'from-blue-500 to-cyan-500', desc: 'Water-related disasters including floods, tsunamis, and heavy rainfall emergencies' },
              { name: 'Earthquakes', icon: '🏚️', color: 'from-amber-500 to-orange-500', desc: 'Seismic activities, building collapses, and earthquake aftermath support' },
              { name: 'Fires', icon: '🔥', color: 'from-red-500 to-rose-500', desc: 'Fire emergencies, building fires, forest fires, and fire-related incidents' },
              { name: 'Medical', icon: '🏥', color: 'from-green-500 to-emerald-500', desc: 'Medical emergencies, health crises, and urgent medical assistance needs' },
              { name: 'Accidents', icon: '🚨', color: 'from-purple-500 to-pink-500', desc: 'Traffic accidents, workplace incidents, and other accident-related emergencies' },
              { name: 'Supplies', icon: '📦', color: 'from-indigo-500 to-blue-500', desc: 'Emergency supplies, food, water, shelter, and essential resource distribution' },
              { name: 'Rescue', icon: '🆘', color: 'from-yellow-500 to-amber-500', desc: 'Search and rescue operations, trapped individuals, and urgent rescue needs' },
              { name: 'Other', icon: '⚠️', color: 'from-gray-500 to-slate-500', desc: 'Other emergency situations not covered in specific categories' }
            ].map((cat, index) => {
              // Determine row based on index (4 columns per row on large screens)
              const isTopRow = index < 4; // First 4 items (indices 0-3)
              const isBottomRow = index >= 4; // Last 4 items (indices 4-7)
              
              return (
              <div 
                key={cat.name}
                className="group relative p-8 bg-gradient-to-br from-white to-[#F8F9FA] rounded-2xl text-center border-2 border-[#E9ECEF] hover:border-[#008C5A] hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-visible active:scale-95"
                style={{animationDelay: `${index * 50}ms`}}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">{cat.icon}</div>
                  <span className="text-base font-semibold text-[#333333] group-hover:text-[#008C5A] transition-colors">{cat.name}</span>
                </div>
                
                {/* Tooltip - Position based on row */}
                {isTopRow && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                    <div className="bg-white rounded-xl px-4 py-3 shadow-2xl w-[240px] border-2 border-[#008C5A]">
                      <p className="font-bold mb-2 text-sm text-[#008C5A]">{cat.name}</p>
                      <p className="text-xs text-gray-700 leading-relaxed">{cat.desc}</p>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-2">
                        <div className="w-3 h-3 bg-white rotate-45 border-r-2 border-b-2 border-[#008C5A]"></div>
                      </div>
                    </div>
                  </div>
                )}
                
                {isBottomRow && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                    <div className="bg-white rounded-xl px-4 py-3 shadow-2xl w-[240px] border-2 border-[#008C5A]">
                      <p className="font-bold mb-2 text-sm text-[#008C5A]">{cat.name}</p>
                      <p className="text-xs text-gray-700 leading-relaxed">{cat.desc}</p>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-2">
                        <div className="w-3 h-3 bg-white rotate-45 border-l-2 border-t-2 border-[#008C5A]"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-[#F8F9FA] to-white relative overflow-hidden z-1">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD700] opacity-5 rounded-full blur-3xl hidden lg:block"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-[#333333] mb-4">Key Features</h2>
          <p className="text-center text-gray-600 mb-16 text-lg max-w-2xl mx-auto px-4">
            Powerful tools to ensure effective emergency response
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              { icon: '📢', title: 'Real-time Alerts', desc: 'Get instant notifications about emergencies in your area with verified updates' },
              { icon: '🗺️', title: 'Interactive Map', desc: 'Find nearby shelters, hospitals, and resources on our community map' },
              { icon: '🤝', title: 'Verified Volunteers', desc: 'Connect with registered volunteers and NGOs ready to assist' }
            ].map((feature, index) => (
              <div 
                key={feature.title}
                className="glass p-10 rounded-3xl hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 group active:scale-95 cursor-pointer"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#008C5A] to-[#00A366] bg-opacity-10 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#333333] mb-4 group-hover:text-[#008C5A] transition-colors">{feature.title}</h3>
                <p className="text-base text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative bg-gradient-to-br from-[#008C5A] via-[#00A366] to-[#006B47] text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#FFD700] opacity-10 rounded-full blur-3xl animate-float hidden md:block"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl" style={{animation: 'float 4s ease-in-out infinite'}}></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-24 sm:py-32">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl sm:text-2xl mb-12 max-w-2xl mx-auto opacity-95 px-4">
            Join our community today and help save lives during emergencies
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center px-4">
            <Link 
              href="/requests/create"
              className="group bg-white text-[#008C5A] hover:bg-gray-100 font-bold py-5 px-12 rounded-xl shadow-2xl transition-all duration-300 text-lg hover:-translate-y-1 hover:shadow-3xl active:scale-95"
            >
              <span className="inline-block group-hover:scale-105 transition-transform">Report Emergency</span>
            </Link>
            <Link 
              href="/volunteer"
              className="group bg-transparent border-3 border-white text-white hover:bg-white hover:text-[#008C5A] font-bold py-5 px-12 rounded-xl transition-all duration-300 text-lg hover:-translate-y-1 hover:shadow-2xl active:scale-95"
            >
              <span className="inline-block group-hover:scale-105 transition-transform">Become a Volunteer</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
