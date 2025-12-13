'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter, useParams } from 'next/navigation';

export default function EditRequestPage() {
  const [formData, setFormData] = useState({
    type: 'Medical',
    description: '',
    location: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    const fetchRequest = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const { data, error } = await supabase
        .from('emergency_requests')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setError('Failed to fetch request.');
        setLoading(false);
      } else {
        if (data.requester_id !== user.id) {
          setError('You are not authorized to edit this request.');
          setLoading(false);
          return;
        }

        // Parse description if it contains "Urgency: "
        let description = data.description;
        // The urgency is just part of the string now, so we just load it as is.
        // Or we could try to extract it, but simple editing is safer.

        setFormData({
          type: data.type,
          description: description,
          location: data.location?.address || '',
        });
        setLoading(false);
      }
    };
    fetchRequest();
  }, [id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const location = { lat: 0, lng: 0, address: formData.location };

    const { error } = await supabase
      .from('emergency_requests')
      .update({
        type: formData.type,
        description: formData.description,
        location,
      })
      .eq('id', id);

    if (error) {
      setError(error.message);
      setSaving(false);
    } else {
      alert('Request updated successfully.');
      router.push('/dashboard');
    }
  };

  if (loading) return <div className="p-8 text-center text-primary font-bold">Loading...</div>;

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-red-50 p-8 rounded-xl border border-red-200 text-center">
        <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
        <p className="text-red-600 mb-4">{error}</p>
        <button onClick={() => router.push('/dashboard')} className="text-gray-600 hover:underline">
          Go Back to Dashboard
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Emergency Request</h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
          {/* Emergency Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-bold text-gray-700 mb-2">
              Emergency Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="Medical">🏥 Medical Help</option>
              <option value="Fire">🔥 Fire</option>
              <option value="Flood">🌊 Flood</option>
              <option value="Rescue">🆘 Rescue</option>
              <option value="Other">⚠️ Other</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-bold text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-primary hover:bg-[#007A4D] text-white font-bold py-3 px-6 rounded-lg transition-colors flex justify-center items-center"
              style={{ backgroundColor: '#008C5A' }}
            >
              {saving ? 'Saving...' : 'Update Request'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
