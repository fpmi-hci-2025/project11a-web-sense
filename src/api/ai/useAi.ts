import { useState } from 'react';
import { AI_BASE_URL } from '../constants';

const request = async (endpoint: string, options: RequestInit = {}) => {
  const res = await fetch(`${AI_BASE_URL}${endpoint}`, {
    ...options,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP ${res.status}`);
  }

  return res.json();
};

export const useAi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateText = async (prompt: string): Promise<string | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await request('/api/compose', {
        method: 'POST',
        body: JSON.stringify({
          query: prompt,
          metadata: {},
        }),
      });
      return data.response || '';
    } catch {
      setError('Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { generateText, loading, error };
};
