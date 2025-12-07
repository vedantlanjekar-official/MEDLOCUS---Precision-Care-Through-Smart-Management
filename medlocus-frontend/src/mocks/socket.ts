// Mock WebSocket/Socket.IO emitter for development
// This simulates real-time events for testing

type EventCallback = (data: unknown) => void;

class MockSocket {
  private listeners: Map<string, EventCallback[]> = new Map();
  private intervalId: NodeJS.Timeout | null = null;
  private isConnected = false;

  connect() {
    this.isConnected = true;
    console.log('[MockSocket] Connected');

    // Emit mock events every 15 seconds for demo
    this.intervalId = setInterval(() => {
      this.emitMockEvents();
    }, 15000);

    // Emit initial connection event
    setTimeout(() => {
      this.emit('connect', {});
    }, 100);
  }

  disconnect() {
    this.isConnected = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    console.log('[MockSocket] Disconnected');
  }

  on(event: string, callback: EventCallback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  off(event: string, callback?: EventCallback) {
    if (!this.listeners.has(event)) return;
    
    if (callback) {
      const callbacks = this.listeners.get(event)!;
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    } else {
      this.listeners.delete(event);
    }
  }

  emit(event: string, data: unknown) {
    const callbacks = this.listeners.get(event) || [];
    callbacks.forEach((callback) => {
      try {
        callback(data);
      } catch (error) {
        console.error(`[MockSocket] Error in callback for ${event}:`, error);
      }
    });
  }

  private emitMockEvents() {
    if (!this.isConnected) return;

    // Randomly emit different event types
    const eventTypes = ['kpi_update', 'notification'];
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];

    if (eventType === 'kpi_update') {
      const kpiIds = ['k1', 'k2', 'k3', 'k4'];
      const kpiId = kpiIds[Math.floor(Math.random() * kpiIds.length)];
      const valueChange = Math.random() * 1000 - 500; // Random change between -500 and +500

      this.emit('kpi_update', {
        id: kpiId,
        value: valueChange,
      });
    } else if (eventType === 'notification') {
      const messages = [
        'Item low stock: Paracetamol',
        'New prescription received',
        'Inventory alert: Insulin vials running low',
        'Expiry warning: Amoxicillin expires soon',
      ];
      const message = messages[Math.floor(Math.random() * messages.length)];

      this.emit('notification', {
        id: 'n' + Date.now(),
        message,
        createdAt: new Date().toISOString(),
      });
    }
  }

  get connected() {
    return this.isConnected;
  }
}

// Export singleton instance
export const mockSocket = new MockSocket();

// Factory function for useRealtime hook
export function createMockSocket(namespace: string = '/ws/notifications') {
  return mockSocket;
}


