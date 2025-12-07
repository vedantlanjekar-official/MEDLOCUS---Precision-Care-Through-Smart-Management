'use client';

import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { createMockSocket } from '@/src/mocks/socket';
import type { KPI } from '@/src/services/api/types';

type EventType = 'kpi_update' | 'notification';

interface RealtimeEvent {
  type: EventType;
  payload: unknown;
}

export function useRealtime(namespace: string = '/ws/notifications') {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<ReturnType<typeof createMockSocket> | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    // Use mock socket in development
    const socket = createMockSocket(namespace);
    socketRef.current = socket;

    const handleConnect = () => {
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    const handleKpiUpdate = (data: { id: string; value: number }) => {
      // Update React Query cache for KPIs
      queryClient.setQueryData<KPI[]>(['kpis'], (oldData) => {
        if (!oldData) return oldData;
        
        return oldData.map((kpi) => {
          if (kpi.id === data.id) {
            // Update value by adding the delta
            return {
              ...kpi,
              value: kpi.value + data.value,
            };
          }
          return kpi;
        });
      });
    };

    const handleNotification = (data: {
      id: string;
      message: string;
      createdAt: string;
    }) => {
      // Could update a notifications query here
      console.log('[Realtime] Notification received:', data);
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('kpi_update', handleKpiUpdate);
    socket.on('notification', handleNotification);

    socket.connect();

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('kpi_update', handleKpiUpdate);
      socket.off('notification', handleNotification);
      socket.disconnect();
    };
  }, [namespace, queryClient]);

  return {
    isConnected,
    socket: socketRef.current,
  };
}


