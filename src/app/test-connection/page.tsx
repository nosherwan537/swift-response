'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';

export default function TestConnectionPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function checkConnection() {
      try {
        // Try to fetch a simple query. Even if table is empty, it checks connection.
        const { error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });

        if (error) {
          throw error;
        }

        setStatus('success');
        setMessage('Successfully connected to Supabase!');
      } catch (err: any) {
        setStatus('error');
        setMessage(err.message || 'Failed to connect');
      }
    }

    checkConnection();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-6">Database Connection Test</h1>
        
        {status === 'loading' && (
          <div className="text-blue-600 font-semibold animate-pulse">
            Testing Connection...
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl">
              ✓
            </div>
            <p className="text-green-700 font-bold text-lg">{message}</p>
            <p className="text-gray-500 text-sm">Your app is ready to store data.</p>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
             <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto text-3xl">
              ✕
            </div>
            <p className="text-red-600 font-bold text-lg">Connection Failed</p>
            <div className="bg-red-50 p-3 rounded text-left text-sm text-red-800 font-mono break-all">
              {message}
            </div>
            <p className="text-gray-600 text-sm mt-4">
              Check your <code>.env.local</code> file and make sure your Supabase URL and Key are correct.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
