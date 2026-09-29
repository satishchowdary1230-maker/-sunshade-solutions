let ioInstance = null;

function initSocket(io) {
  ioInstance = io;

  io.on('connection', (socket) => {
    console.log(`[Socket.io] Admin client connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`[Socket.io] Admin client disconnected: ${socket.id}`);
    });

    socket.on('ping_admin', () => {
      socket.emit('pong_admin', { serverTime: new Date().toISOString() });
    });
  });

  return io;
}

function broadcastNewLead(lead) {
  if (ioInstance) {
    try {
      ioInstance.emit('new_lead', lead);
      ioInstance.emit('lead:created', lead);
      console.log(`[Socket.io] Emitted 'new_lead' for client: ${lead.fullName}`);
    } catch (err) {
      console.warn('[Socket.io] Error broadcasting lead:', err);
    }
  }
}

function broadcastLeadUpdated(lead) {
  if (ioInstance) {
    try {
      ioInstance.emit('lead_updated', lead);
      ioInstance.emit('lead:updated', lead);
      console.log(`[Socket.io] Emitted 'lead_updated' for lead ID: ${lead._id}`);
    } catch (err) {
      console.warn('[Socket.io] Error broadcasting update:', err);
    }
  }
}

function broadcastLeadDeleted(id) {
  if (ioInstance) {
    try {
      ioInstance.emit('lead_deleted', { id });
      ioInstance.emit('lead:deleted', { id });
      console.log(`[Socket.io] Emitted 'lead_deleted' for ID: ${id}`);
    } catch (err) {
      console.warn('[Socket.io] Error broadcasting deletion:', err);
    }
  }
}

module.exports = {
  initSocket,
  broadcastNewLead,
  broadcastLeadUpdated,
  broadcastLeadDeleted,
};
