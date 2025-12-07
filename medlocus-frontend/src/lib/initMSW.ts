// Initialize MSW in browser (only as fallback when backend is unavailable)
'use client';

import { useEffect, useState } from 'react';

export function useMSW() {
  const [mswReady, setMswReady] = useState(false);
  const [useMSWMode, setUseMSWMode] = useState(false);

  useEffect(() => {
    // Check if backend is available
    const checkBackend = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/health');
        if (response.ok) {
          // Backend is available, skip MSW
          setMswReady(true);
          setUseMSWMode(false);
          return;
        }
      } catch (error) {
        // Backend not available, use MSW as fallback
        console.warn('Backend not available, using MSW mocks');
      }

      // Start MSW only if backend is not available
      if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        try {
          const { worker } = await import('@/src/lib/msw');
          await worker.start({
            onUnhandledRequest: 'bypass',
          });
          setUseMSWMode(true);
          setMswReady(true);
        } catch (error) {
          console.error('Failed to start MSW:', error);
          setMswReady(true);
        }
      } else {
        setMswReady(true);
      }
    };

    checkBackend();
  }, []);

  return { mswReady, useMSWMode };
}

