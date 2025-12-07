'use client';

import { useMSW } from '@/src/lib/initMSW';

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const { mswReady, useMSWMode } = useMSW();

  if (!mswReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0f62fe] mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {useMSWMode && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2 text-sm text-yellow-800 text-center">
          ⚠️ Using mock data (Backend not available)
        </div>
      )}
      {children}
    </>
  );
}

