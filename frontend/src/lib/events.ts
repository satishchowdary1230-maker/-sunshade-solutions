import { EventEmitter } from 'events';

// Create a global singleton event emitter for Next.js
declare global {
  // eslint-disable-next-line no-var
  var globalEventEmitter: EventEmitter | undefined;
  // eslint-disable-next-line no-var
  var globalSocketIo: any | undefined;
}

export const eventBus = global.globalEventEmitter || new EventEmitter();
eventBus.setMaxListeners(100);

if (!global.globalEventEmitter) {
  global.globalEventEmitter = eventBus;
}

// Active Server-Sent Events (SSE) client controllers
type SSEController = ReadableStreamDefaultController;
const sseClients = new Set<SSEController>();

export function registerSSEClient(controller: SSEController): () => void {
  sseClients.add(controller);
  return () => {
    sseClients.delete(controller);
  };
}

export function broadcastSSE(event: string, data: any) {
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  const encoder = new TextEncoder();
  const encoded = encoder.encode(payload);

  for (const client of sseClients) {
    try {
      client.enqueue(encoded);
    } catch {
      sseClients.delete(client);
    }
  }
}

// Global Lead Broadcast Dispatcher
export function broadcastLeadCreated(lead: any) {
  // 1. Emit to local event bus
  eventBus.emit('lead:created', lead);

  // 2. Broadcast to all active SSE subscribers
  broadcastSSE('lead:created', lead);

  // 3. Broadcast to Socket.io if running on custom server
  if (global.globalSocketIo) {
    try {
      global.globalSocketIo.emit('new_lead', lead);
      global.globalSocketIo.emit('lead:created', lead);
    } catch (err) {
      console.warn('Socket.io broadcast error:', err);
    }
  }
}

export function broadcastLeadUpdated(lead: any) {
  eventBus.emit('lead:updated', lead);
  broadcastSSE('lead:updated', lead);
  if (global.globalSocketIo) {
    try {
      global.globalSocketIo.emit('lead_updated', lead);
      global.globalSocketIo.emit('lead:updated', lead);
    } catch (err) {
      console.warn('Socket.io broadcast error:', err);
    }
  }
}

export function broadcastLeadDeleted(id: string) {
  eventBus.emit('lead:deleted', { id });
  broadcastSSE('lead:deleted', { id });
  if (global.globalSocketIo) {
    try {
      global.globalSocketIo.emit('lead_deleted', { id });
      global.globalSocketIo.emit('lead:deleted', { id });
    } catch (err) {
      console.warn('Socket.io broadcast error:', err);
    }
  }
}
