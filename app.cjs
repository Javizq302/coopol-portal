const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      status: 'ok',
      env: process.env.NODE_ENV,
      node: process.version,
      fecha: new Date().toISOString()
    }));
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="utf-8"><title>DEV COOPOL</title></head>
    <body style="font-family:sans-serif;text-align:center;margin-top:80px">
      <h1>dev.coopol.com.do funcionando ✅</h1>
      <p>Node ${process.version} | Modo: ${process.env.NODE_ENV}</p>
      <a href="/api/health">Probar /api/health</a>
    </body>
    </html>
  `);
});

server.listen(PORT, () => console.log(`Corriendo en puerto ${PORT}`));