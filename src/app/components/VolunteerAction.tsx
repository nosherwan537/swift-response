'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { IEmergencyRequest, IVolunteerRegistration } from '@/types/models';

interface VolunteerActionProps {
  request: IEmergencyRequest;
  userId: string;
  existingRegistration: IVolunteerRegistration | null;
  onRegistrationSuccess: (newReg: IVolunteerRegistration) => void;
}

export default function VolunteerAction({ request, userId, existingRegistration, onRegistrationSuccess }: VolunteerActionProps) {
  const [loading, setLoading] = useState(false);
  const [showMessageInput, setShowMessageInput] = useState(false);
  const [message, setMessage] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  if (existingRegistration) {
    return (
      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center text-green-700 font-bold mb-2">
          <span>✅ You have volunteered</span>
        </div>
        {existingRegistration.message && (
          <p className="text-green-600 text-sm italic">" {existingRegistration.message} "</p>
        )}
        <div className="text-xs text-green-500 mt-1">Shared Contact: {existingRegistration.contact_info}</div>
      </div>
    );
  }

  const handleVolunteer = async () => {
    if (!contactInfo.trim()) {
      alert('Please provide your contact number so the requester can reach you.');
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('volunteer_registrations')
      .insert({
        request_id: request.id,
        volunteer_id: userId,
        message: message.trim() || null,
        contact_info: contactInfo.trim()
      })
      .select()
      .single();

    if (error) {
      alert('Error volunteering: ' + error.message);
      setLoading(false);
    } else {
      onRegistrationSuccess(data);
      setLoading(false);
      setShowMessageInput(false);
    }
  };

  return (
    <div className="mt-4">
      {!showMessageInput ? (
        <button
          onClick={() => setShowMessageInput(true)}
          disabled={loading}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors flex items-center gap-2"
        >
          <span>✋</span> Volunteer to Help
        </button>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 animate-fade-in-up">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Contact Number *
          </label>
          <input
            type="tel"
            className="w-full p-2 border border-gray-300 rounded-md mb-3 text-sm focus:ring-2 focus:ring-yellow-500 outline-none"
            placeholder="+1 234 567 8900"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            required
          />

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Leave a message (optional):
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md mb-3 text-sm focus:ring-2 focus:ring-yellow-500 outline-none"
            placeholder="I can bring a first aid kit..."
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={handleVolunteer}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-4 rounded shadow-sm transition-colors text-sm"
            >
              {loading ? 'Registering...' : 'Confirm'}
            </button>
            <button
              onClick={() => setShowMessageInput(false)}
              disabled={loading}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1.5 px-4 rounded shadow-sm transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
