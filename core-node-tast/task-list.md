# Node.js Core Modules - Practical Implementation Tasks

Based on the readme, here are 20 micro-tasks to help you master Node.js core modules through hands-on practice:

---

## 🔴 Essential Modules (Daily Use)

### 1. **File System Logger** 
**Modules:** `fs`, `path`, `process`

**Task:** Create a logging system that:
- Writes logs to a file named `app-{date}.log` in a `logs/` directory
- Each log entry includes timestamp, log level (INFO/WARN/ERROR), and message
- Also prints logs to console with color coding
- Use `process.argv` to accept a log message as command-line argument

**Hint:** 
- Use `fs.appendFileSync` or `fs.promises.appendFile`
- `path.join()` for cross-platform paths
- `process.argv` to get command-line arguments

---

### 2. **HTTP File Server**
**Modules:** `http`, `fs`, `path`, `stream`

**Task:** Build a simple web server that:
- Serves static files from a `public/` directory
- Automatically sets correct MIME types (html, css, js, png, jpg)
- Handles 404 errors gracefully
- Streams large files instead of loading them into memory

**Hint:** 
- `http.createServer()` for the server
- `stream.createReadStream()` for streaming
- Use `path.extname()` to determine file type
- Pipe streams with `readStream.pipe(res)`

---

### 3. **Directory Watcher & Event Emitter**
**Modules:** `fs`, `events`, `path`

**Task:** Create a file watcher that:
- Monitors a `watch/` directory for changes (add, remove, modify)
- Emits events when changes occur
- Maintains a log of all changes with timestamps
- Processes files differently based on their extensions

**Hint:**
- `fs.watch()` or `fs.watchFile()`
- Extend `EventEmitter` class
- Listen to 'change', 'add', 'unlink' events

---

### 4. **Promise-based File Utility**
**Modules:** `fs/promises`, `util`, `path`

**Task:** Create a file utility that:
- Reads a JSON config file
- Updates specific values
- Writes back to the same file
- Uses `util.inspect()` to pretty-print the config
- Implements retry logic with `util.promisify()` on callback-based functions

**Hint:**
- Import from `'node:fs/promises'`
- `JSON.parse()` and `JSON.stringify()`
- `util.inspect(config, { depth: null, colors: true })`

---

### 5. **URL Shortener CLI Tool**
**Modules:** `url`, `querystring`, `fs`, `process`

**Task:** Build a command-line tool that:
- Accepts a URL as input
- Generates a short code (e.g., using crypto or simple counter)
- Saves mapping in a JSON file
- Can resolve short code back to original URL
- Parse and validate URLs using `URL` class

**Hint:**
- `new URL(inputUrl)` for validation
- `URLSearchParams` for query parameter manipulation
- Store mappings as `{ shortCode: { url, createdAt, clicks } }`

---

## 🟡 Very Important Modules (Regular Use)

### 6. **System Monitor**
**Modules:** `os`, `process`, `timers`, `fs`

**Task:** Create a system monitor that:
- Logs system information every 5 seconds
- Displays: CPU usage, memory usage, uptime, platform, network interfaces
- Writes metrics to a CSV file for analysis
- Stops when memory usage exceeds 80%

**Hint:**
- `os.cpus()`, `os.freemem()`, `os.totalmem()`
- `setInterval()` for periodic monitoring
- Calculate CPU percentage between intervals
- `process.cpuUsage()` for process-specific usage

---

### 7. **File Encryptor/Decryptor**
**Modules:** `crypto`, `fs`, `stream`, `path`

**Task:** Build a tool that:
- Encrypts files using AES-256-CBC
- Decrypts encrypted files back to original
- Uses password-based key derivation (PBKDF2)
- Handles large files via streaming
- Displays progress during operations

**Hint:**
- `crypto.createCipheriv()` and `crypto.createDecipheriv()`
- `crypto.randomBytes()` for IV and salt
- `crypto.pbkdf2Sync()` for key derivation
- Use transforms with streams

---

### 8. **Process Manager**
**Modules:** `child_process`, `process`, `events`, `fs`

**Task:** Create a simple process manager that:
- Spawns child processes (e.g., run a script multiple times)
- Monitors output and errors
- Restarts processes if they crash
- Allows graceful shutdown with signals
- Logs stdout/stderr to separate files

**Hint:**
- `child_process.spawn()`
- Listen to 'exit', 'error', 'close' events
- `process.on('SIGINT')` for graceful shutdown
- Use `child.stdout.on('data')` and `child.stderr.on('data')`

---

### 9. **Buffer Image Processor**
**Modules:** `buffer`, `fs`, `path`

**Task:** Build an image processing utility that:
- Reads an image file into a Buffer
- Converts it to a different format (conceptually)
- Extracts metadata (size, format)
- Creates a thumbnail (you can use base64 for demonstration)
- Splits and merges buffers

**Hint:**
- `fs.readFile()` returns a Buffer
- Access Buffer properties: `.length`, `.toString('hex')`, `.slice()`
- Use `Buffer.concat()` for merging
- For real images, you'd use `sharp` but here focus on Buffer manipulation

---

### 10. **Timer Scheduler**
**Modules:** `timers`, `events`, `process`

**Task:** Create a task scheduler that:
- Runs tasks at specific times
- Supports interval-based tasks
- Allows tasks to be paused, resumed, and canceled
- Logs task execution history
- Uses `setImmediate()` for immediate tasks

**Hint:**
- `setTimeout()`, `setInterval()`, `setImmediate()`
- Store timer references for control
- Clear timers with `clearTimeout()`/`clearInterval()`
- Use `unref()` to allow process exit

---

## 🟢 Domain-Specific Modules

### 11. **TCP Chat Server**
**Modules:** `net`, `events`, `process`

**Task:** Build a multi-client chat server using TCP:
- Clients connect via `telnet`
- Broadcast messages to all connected clients
- Handle disconnections gracefully
- Support private messages between users
- Implement simple commands (/list, /quit, /msg user)

**Hint:**
- `net.createServer()`
- Maintain a map of socket connections
- `socket.on('data')` for incoming messages
- `socket.write()` for sending messages

---

### 12. **Cluster-based Web Server**
**Modules:** `cluster`, `http`, `os`, `process`

**Task:** Create a web server that:
- Spawns worker processes equal to CPU cores
- Shares the same port
- Handles graceful shutdown
- Implements a simple in-memory counter that works across workers
- Logs which worker handled each request

**Hint:**
- `cluster.isMaster` vs `cluster.isWorker`
- `cluster.fork()` for spawning workers
- `cluster.on('exit')` for handling worker crashes
- Use `worker.send()` for inter-process communication

---

### 13. **Interactive CLI Tool**
**Modules:** `readline`, `process`, `fs`

**Task:** Build an interactive CLI that:
- Prompts users for input with autocomplete
- Has a command history (up/down arrow)
- Supports commands: `help`, `echo`, `save`, `load`, `exit`
- Saves command history to a file
- Displays a custom prompt

**Hint:**
- `readline.createInterface()`
- Use `.question()` for prompts
- `rl.history` for command history
- `rl.on('line')` for processing commands

---

### 14. **File Compressor**
**Modules:** `zlib`, `fs`, `stream`, `path`

**Task:** Build a file compression tool that:
- Compresses files using gzip
- Decompresses .gz files
- Shows compression ratio
- Handles large files with streaming
- Supports multiple files and directories

**Hint:**
- `zlib.createGzip()` and `zlib.createGunzip()`
- Pipe between streams
- Use `fs.createReadStream()` and `fs.createWriteStream()`
- Compare original and compressed sizes

---

### 15. **DNS Lookup Tool**
**Modules:** `dns`, `net`, `util`, `process`

**Task:** Build a DNS utility that:
- Performs A, AAAA, MX, and TXT record lookups
- Resolves IP to hostname (reverse lookup)
- Measures DNS resolution time
- Checks if a host is reachable
- Caches DNS results

**Hint:**
- `dns.lookup()`, `dns.resolve()`, `dns.reverse()`
- `dns.resolveMx()`, `dns.resolveTxt()`
- Use `Date.now()` for timing
- Simple in-memory cache with TTL

---

### 16. **Unit Test Runner**
**Modules:** `assert`, `fs`, `path`, `process`

**Task:** Create a simple test runner that:
- Finds all test files (*.test.js)
- Runs tests using assert module
- Reports passing and failing tests
- Shows assertion details on failure
- Has a watch mode

**Hint:**
- `assert.strictEqual()`, `assert.deepStrictEqual()`
- `fs.readdirSync()` for finding test files
- `require()` or `import()` for loading tests
- Wrap tests in try/catch for error handling

---

### 17. **Module Loader Inspector**
**Modules:** `module`, `require`, `path`, `fs`

**Task:** Build a tool that:
- Shows all loaded modules in a Node.js application
- Resolves module paths to absolute paths
- Checks if a module exists without loading it
- Shows module dependency tree
- Implements custom module resolution

**Hint:**
- `require.resolve()` for resolution
- `require.cache` for loaded modules
- `module.children` for dependencies
- `path.resolve()` for absolute paths

---

### 18. **Crypto Hash Generator**
**Modules:** `crypto`, `fs`, `stream`, `path`

**Task:** Create a file hash utility that:
- Computes MD5, SHA-1, SHA-256, SHA-512 hashes
- Streams files for large file support
- Compares two files by hash
- Verifies file integrity using checksum file
- Generates checksum files

**Hint:**
- `crypto.createHash()`
- `hash.update()` and `hash.digest()`
- Use streams with `crypto.Hash`
- `fs.createReadStream().pipe(hash)`

---

### 19. **Network Socket Inspector**
**Modules:** `net`, `dns`, `os`, `process`

**Task:** Build a network inspector that:
- Lists all open ports on the system
- Shows which services are running
- Checks if specific ports are open
- Performs port scanning (range)
- Identifies service by port number

**Hint:**
- `net.createConnection()` for checking ports
- Use `os.networkInterfaces()` for interface info
- `dns.lookupService()` for service identification
- Handle connection timeouts

---

### 20. **Log Rotator**
**Modules:** `fs`, `path`, `stream`, `timers`

**Task:** Create a log rotation system that:
- Automatically rotates logs based on size or time
- Compresses old logs with gzip
- Keeps only last N log files
- Can be integrated with existing logger
- Handles concurrent writes safely

**Hint:**
- Use `fs.renameSync()` for rotation
- `zlib.createGzip()` for compression
- `fs.appendFileSync()` with error handling
- Check file size with `fs.statSync().size`

---

## 🎯 Getting Started

1. Create a project directory
2. Initialize with `npm init -y`
3. Create a separate .js file for each task
4. Test each one individually
5. Try combining multiple modules in one solution

## 💡 Progression Path

**Week 1:** Tasks 1-5 (Essential modules)
**Week 2:** Tasks 6-10 (Important modules)
**Week 3:** Tasks 11-15 (Domain-specific)
**Week 4:** Tasks 16-20 (Advanced integration)
