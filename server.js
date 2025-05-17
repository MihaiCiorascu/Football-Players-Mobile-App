import http from 'http';
import { initWebSocket } from './src/server/websocket.js';
import './src/server/backgroundMonitor.js'; // Start background monitoring

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('WebSocket server is running');
});

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';

server.listen(PORT, HOST, () => {
  console.log(`WebSocket server is running on ${HOST}:${PORT}`);
  initWebSocket(server);
}); 