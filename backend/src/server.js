require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');

const { connectDB } = require('./config/db');
const { initSocket } = require('./socket/socketHandler');
const leadRoutes = require('./routes/leadRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const server = http.createServer(app);

const PORT = parseInt(process.env.PORT || '5000', 10);
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// Initialize Socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  },
  path: '/socket.io',
});

initSocket(io);

// Middlewares
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'Sunshade Solutions Enterprise Backend API',
    endpoints: {
      leads: '/api/leads',
      products: '/api/products',
      stats: '/api/stats',
      sseStream: '/api/leads/stream',
      socketIo: '/socket.io',
    },
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/leads', leadRoutes);
app.use('/api', productRoutes);

// Connect to MongoDB Atlas (or fallback to memory store)
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`
==================================================================
  SUNSHADE SOLUTIONS - BACKEND API & SOCKET.IO SERVER
==================================================================
  * API Base URL     : http://localhost:${PORT}
  * Socket.io Server : Active on ws://localhost:${PORT}/socket.io
  * Live SSE Stream  : Active on http://localhost:${PORT}/api/leads/stream
  * Client Allowed   : ${CLIENT_URL}
==================================================================
    `);
  });
});
