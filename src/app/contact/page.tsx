'use client';

import { useState } from 'react';
import Link from 'next/link';
import HeroCardSection from '@/components/hero/HeroCardSection';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  const heroCards = [
    { title: 'We are always here to listen to you', icon: '👂' },
    { title: 'Quick responses to your queries', icon: '⚡' },
    { title: 'Multiple ways to reach us', icon: '📞' }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <HeroCardSection 
        cards={heroCards}
        pageTitle="Contact Us"
        subtitle="Have questions or suggestions? We'd love to hear from you"
      />

      <div className="max-w-5xl mx-auto py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="min-h-screen flex items-center justify-center py-12 sm:py-16">
          <div className="w-full">
            {/* Emergency Disclaimer */}
            <div className="bg-red-50 border-l-4 border-red-500 p-4 sm:p-6 mb-8 sm:mb-12 rounded-r-xl">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm text-red-700">
                <span className="font-bold">Urgent Emergency?</span> For immediate emergencies, please use the{' '}
                <Link href="/requests/create" className="underline hover:text-red-900 font-semibold">
                  Report Help
                </Link>{' '}
                page or call your local emergency number (e.g., 1122).
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#333333] mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008C5A] focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008C5A] focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008C5A] focus:border-transparent transition-all resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-gradient-to-r from-[#008C5A] to-[#00A366] text-white font-bold py-4 px-8 rounded-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <p className="text-green-700 font-semibold">Message sent successfully! We'll get back to you soon.</p>
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#333333] mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              {/* Email */}
              <div className="glass p-6 rounded-2xl hover:shadow-lg transition-all">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#008C5A] to-[#00A366] rounded-lg flex items-center justify-center text-white text-xl mr-4 flex-shrink-0">
                    ✉️
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#333333] mb-1">Email</h3>
                    <p className="text-gray-600">support@swiftresponse.com</p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="glass p-6 rounded-2xl hover:shadow-lg transition-all">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#008C5A] to-[#00A366] rounded-lg flex items-center justify-center text-white text-xl mr-4 flex-shrink-0">
                    📞
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#333333] mb-1">Phone</h3>
                    <p className="text-gray-600">+92 300 1234567</p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="glass p-6 rounded-2xl hover:shadow-lg transition-all">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#008C5A] to-[#00A366] rounded-lg flex items-center justify-center text-white text-xl mr-4 flex-shrink-0">
                    📍
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#333333] mb-1">Address</h3>
                    <p className="text-gray-600">123 Emergency Lane<br />Lahore, Pakistan</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="glass p-6 rounded-2xl">
                <h3 className="font-bold text-lg text-[#333333] mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white rounded-lg flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                    aria-label="Facebook"
                  >
                    <img src="/Facebook.svg" alt="Facebook" className="w-8 h-8" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white rounded-lg flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                    aria-label="LinkedIn"
                  >
                    <img src="/linkedin.svg" alt="LinkedIn" className="w-8 h-8" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white rounded-lg flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                    aria-label="Instagram"
                  >
                    <img src="/Instagram-Logo.png" alt="Instagram" className="w-8 h-8" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white rounded-lg flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                    aria-label="Twitter/X"
                  >
                    <img src="/X.png" alt="X (Twitter)" className="w-8 h-8" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
}
