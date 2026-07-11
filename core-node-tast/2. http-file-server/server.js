import http from "node:http";
import fs from "fs";
import path from "path";
import { dirname } from "node:path/win32";
import { fileURLToPath } from "node:url";

const server = http.createServer((req, res) => {
  const filePath = path.join(
    dirname(fileURLToPath(import.meta.url)),
    "public",
    req.url === "/" ? "index.html" : req.url,
  );

  const extName = path.extname(filePath);

  const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".json": "application/json",
  };

  const contentType = mimeTypes[extName] || "application/octet-stream";

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "application/html" });
      res.end("<h1>404 - File Not Found</h1>");
      return;
    }

    res.writeHead(200, { "Content-Type": contentType });

    const readStream = fs.createReadStream(filePath);

    readStream.on("error", (streamErr) => {
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<h1>500 - Internal Server Error</h1>");
    });

    readStream.pipe(res)
  });



});

server.listen(3300, '127.0.0.1', () => {
  console.log('server listening on http://localhost:3300')
})



// ### 2. **HTTP File Server**
// **Modules:** `http`, `fs`, `path`, `stream`

// **Task:** Build a simple web server that:
// - Serves static files from a `public/` directory
// - Automatically sets correct MIME types (html, css, js, png, jpg)
// - Handles 404 errors gracefully
// - Streams large files instead of loading them into memory

// **Hint:**
// - `http.createServer()` for the server
// - `stream.createReadStream()` for streaming
// - Use `path.extname()` to determine file type
// - Pipe streams with `readStream.pipe(res)`
