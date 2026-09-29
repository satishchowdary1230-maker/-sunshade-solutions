import { NextRequest } from 'next/server';
import { registerSSEClient } from '@/lib/events';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  let unregister: (() => void) | null = null;
  let heartbeatInterval: NodeJS.Timeout | null = null;

  const stream = new ReadableStream({
    start(controller) {
      // Register controller to receive broadcast events
      unregister = registerSSEClient(controller);

      // Send initial handshake
      const encoder = new TextEncoder();
      const initialPayload = `event: connected\ndata: ${JSON.stringify({
        message: 'Connected to Sunshade Solutions Live Lead Stream',
        timestamp: new Date().toISOString(),
      })}\n\n`;
      controller.enqueue(encoder.encode(initialPayload));

      // Keep-alive heartbeat ping every 15 seconds
      heartbeatInterval = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(': ping\n\n'));
        } catch {
          if (heartbeatInterval) clearInterval(heartbeatInterval);
        }
      }, 15000);
    },
    cancel() {
      if (unregister) unregister();
      if (heartbeatInterval) clearInterval(heartbeatInterval);
    },
  });

  // Handle client disconnection
  request.signal.addEventListener('abort', () => {
    if (unregister) unregister();
    if (heartbeatInterval) clearInterval(heartbeatInterval);
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
