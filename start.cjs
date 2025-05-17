const { spawn } = require('child_process');
const path = require('path');

// Start Next.js app
const nextApp = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

// Start WebSocket server
const wsServer = spawn('node', ['server.js'], {
  stdio: 'inherit',
  shell: true
});

// Handle process termination
process.on('SIGINT', () => {
  nextApp.kill();
  wsServer.kill();
  process.exit();
});

process.on('SIGTERM', () => {
  nextApp.kill();
  wsServer.kill();
  process.exit();
}); 