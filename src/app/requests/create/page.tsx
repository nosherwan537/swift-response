'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';

export default function RequestHelpPage() {
  const [formData, setFormData] = useState({
    type: 'Medical Help',
    description: '',
    location: '',
    urgency: 'High',
    images: null as File[] | null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login?message=Please log in to request help');
      } else {
        setUser(user);
      }
    };
    checkUser();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        images: Array.from(e.target.files!)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError(null);

    const location = { lat: 0, lng: 0, address: formData.location };

    const { error } = await supabase.from('emergency_requests').insert({
      requester_id: user.id,
      type: formData.type,
      description: formData.description,
      location,
      urgency: formData.urgency,
      status: 'pending'
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      alert('Emergency reported successfully! Help is on the way.');
      router.push('/dashboard');
    }
  };

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#008C5A] mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#DC3545] to-[#C82333] text-white py-16 text-center overflow-hidden">
        <div className="absolute top-10 right-10 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl animate-float"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in-up">Report Emergency</h1>
          <p className="text-lg opacity-95 max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '100ms'}}>
            Get immediate help by reporting your emergency
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto py-12 px-4">
        {/* Instructions */}
        <div className="glass p-8 rounded-2xl mb-8">
          <h3 className="text-2xl font-bold text-[#333333] mb-4 flex items-center">
            <span className="text-3xl mr-3">ℹ️</span>
            How to Report Correctly
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-[#008C5A] mr-3 text-xl">✓</span>
              <span>Select the correct category for your emergency</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#008C5A] mr-3 text-xl">✓</span>
              <span>Provide a precise location or description of surroundings</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#008C5A] mr-3 text-xl">✓</span>
              <span>Keep the description clear and concise</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#008C5A] mr-3 text-xl">✓</span>
              <span>Upload photos if safe to do so (Optional)</span>
            </li>
          </ul>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
            <p className="text-red-700 font-semibold">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Emergency Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-bold text-gray-700 mb-2">
              Emergency Type *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC3545] focus:border-transparent transition-all"
            >
              <option value="Medical Help">🏥 Medical Help</option>
              <option value="Fire">🔥 Fire</option>
              <option value="Flood">🌊 Flood</option>
              <option value="Earthquake">🏚️ Earthquake</option>
              <option value="Accident">🚨 Accident</option>
              <option value="Rescue">🆘 Rescue</option>
              <option value="Supplies Needed">📦 Supplies Needed</option>
              <option value="Other">⚠️ Other</option>
            </select>
          </div>

          {/* Urgency Level */}
          <div>
            <label htmlFor="urgency" className="block text-sm font-bold text-gray-700 mb-2">
              Urgency Level *
            </label>
            <div className="grid grid-cols-3 gap-4">
              {['High', 'Medium', 'Low'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, urgency: level }))}
                  className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                    formData.urgency === level
                      ? level === 'High'
                        ? 'bg-red-500 text-white'
                        : level === 'Medium'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC3545] focus:border-transparent transition-all resize-none"
              placeholder="Describe the emergency situation in detail..."
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-bold text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC3545] focus:border-transparent transition-all"
              placeholder="Enter address or nearby landmarks..."
            />
            <p className="text-sm text-gray-500 mt-2">
              📍 Provide your current location or the location of the emergency
            </p>
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="images" className="block text-sm font-bold text-gray-700 mb-2">
              Upload Images (Optional)
            </label>
            <input
              type="file"
              id="images"
              name="images"
              onChange={handleFileChange}
              multiple
              accept="image/*"
              className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC3545] focus:border-transparent transition-all"
            />
            <p className="text-sm text-gray-500 mt-2">
              📷 Upload photos if it's safe to do so (Max 5 images)
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#DC3545] to-[#C82333] text-white font-bold py-4 px-8 rounded-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              '🚨 Submit Emergency Report'
            )}
          </button>
        </form>

        {/* Emergency Contact */}
        <div className="mt-8 glass p-6 rounded-2xl text-center">
          <p className="text-gray-700">
            <span className="font-bold text-red-600">Life-threatening emergency?</span>
            <br />
            Call emergency services immediately: <span className="font-bold text-2xl">1122</span>
          </p>
        </div>
      </div>
    </div>
  );
}
