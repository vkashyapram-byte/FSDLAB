const http = require('http');
const server = http.createServer((req, res) => {
 res.setHeader('Content-Type', 'application/json');
 if (req.method === 'GET' && req.url === '/') {
 res.writeHead(200);
 res.end(JSON.stringify({ message: 'Welcome to Node.js Server!' }));
 } else if (req.method === 'GET' && req.url === '/about') {
 res.writeHead(200);
 res.end(JSON.stringify({ course: 'Full Stack Development', lab: 'Node.js Server' }));
 } else if (req.method === 'POST' && req.url === '/data') {
 let body = '';
 req.on('data', chunk => { body += chunk; });
 req.on('end', () => {
 res.writeHead(200);
 res.end(JSON.stringify({ received: JSON.parse(body) }));
 });
 } else {
 res.writeHead(404);
 res.end(JSON.stringify({ error: 'Route not found' }));
 }
});
server.listen(3000, () => {
 console.log('Server running at http://localhost:3000');
});
