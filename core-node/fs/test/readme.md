hands-on guide to the **`fs` (File System)** module — the module you'll use constantly in Node.js.

---

## 1. Two API Styles: Callback vs. Promise vs. Sync

Node's `fs` has **three flavors** for almost every operation:

| Style | Import | Use When |
|-------|--------|----------|
| **Callback** | `const fs = require('fs')` | Legacy code, event-driven callbacks |
| **Promise** | `const fs = require('fs').promises` or `import * as fs from 'node:fs/promises'` | **Modern code** — `async/await` |
| **Synchronous** | `fs.readFileSync()`, `fs.mkdirSync()` | **Startup/config only** — blocks the event loop |

> **Rule of thumb:** Use `fs/promises` for everything. Use `Sync` methods only during server startup when loading config files.

---

## 2. Reading Files

### Reading entire file (small files)

```javascript
const fs = require('node:fs/promises');

// Modern async/await
async function readConfig() {
  try {
    const data = await fs.readFile('./config.json', 'utf-8');
    const config = JSON.parse(data);
    console.log(config);
  } catch (err) {
    console.error('Failed to read:', err.message);
  }
}

readConfig();
```

**Key points:**
- Always pass `'utf-8'` as the second argument, or you get a raw `Buffer`
- Without encoding: `const buffer = await fs.readFile('./image.png');` — useful for binary data

### Reading line-by-line (large files)

```javascript
const fs = require('node:fs');
const readline = require('node:readline');

const stream = fs.createReadStream('./huge-log.txt', 'utf-8');
const rl = readline.createInterface({ input: stream });

rl.on('line', (line) => {
  console.log('Processing:', line);
});
```

> Never `readFile()` a multi-GB log. Use streams.

---

## 3. Writing Files

### Write (overwrite) and Append

```javascript
const fs = require('node:fs/promises');

async function writeLog(message) {
  // Overwrites existing content
  await fs.writeFile('./output.txt', message, 'utf-8');
  
  // Adds to end of file (creates if doesn't exist)
  await fs.appendFile('./logs.txt', `${new Date().toISOString()} - ${message}\n`);
}
```

### Ensure directory exists before writing

```javascript
const fs = require('node:fs/promises');
const path = require('node:path');

async function safeWrite(filePath, data) {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true }); // Creates nested dirs if needed
  await fs.writeFile(filePath, data);
}

safeWrite('./data/users/john/profile.json', '{"name": "John"}');
```

---

## 4. Directories

```javascript
const fs = require('node:fs/promises');

async function manageDirs() {
  // Create directory (recursive = mkdir -p)
  await fs.mkdir('./uploads/2026/july', { recursive: true });
  
  // Read directory contents
  const files = await fs.readdir('./uploads', { withFileTypes: true });
  
  for (const entry of files) {
    console.log(entry.name, entry.isDirectory() ? '[DIR]' : '[FILE]');
  }
  
  // Remove empty directory
  await fs.rmdir('./old-empty-folder');
  
  // Remove directory and everything inside (recursive delete)
  await fs.rm('./temp-cache', { recursive: true, force: true });
}
```

> `fs.rm()` with `{ recursive: true }` is the modern replacement for the old `fs.rmdir()` recursive hack.

---

## 5. File Metadata & Checks

```javascript
const fs = require('node:fs/promises');

async function inspectFile(filePath) {
  try {
    const stats = await fs.stat(filePath);
    
    console.log({
      size: stats.size,           // bytes
      isFile: stats.isFile(),
      isDirectory: stats.isDirectory(),
      created: stats.birthtime,   // creation time
      modified: stats.mtime,     // last modified
      accessed: stats.atime,     // last accessed
    });
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('File does not exist');
    }
  }
}

// Quick existence check (no need for try/catch if you handle false)
async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
```

> **Use `fs.access()` to check permissions/existence** — don't use `fs.exists()` (it's deprecated and has race condition issues).

---

## 6. Copying, Moving, Renaming

```javascript
const fs = require('node:fs/promises');

async function fileOperations() {
  // Copy file
  await fs.copyFile('./source.txt', './backup.txt');
  
  // Rename / Move
  await fs.rename('./old-name.txt', './new-name.txt');
  
  // Move across directories
  await fs.rename('./temp/file.txt', './archive/file.txt');
}
```

---

## 7. Watching Files (Real-time)

```javascript
const fs = require('node:fs');

// Watch a single file
const watcher = fs.watch('./config.json', (eventType, filename) => {
  console.log(`Event: ${eventType}, File: ${filename}`);
  // eventType is 'change' or 'rename'
});

// Watch entire directory
const dirWatcher = fs.watch('./uploads', { recursive: true }, (event, filename) => {
  console.log(`${filename} was ${event}d`);
});

// Stop watching when done
setTimeout(() => {
  watcher.close();
  dirWatcher.close();
}, 60000);
```

> `fs.watch()` is **fast but can be unreliable** across platforms. For production file watching, consider the `chokidar` npm package.

---

## 8. Working with Streams (The Performance Secret)

When dealing with files larger than memory:

```javascript
const fs = require('node:fs');

// Copy a 5GB file without loading it into RAM
fs.createReadStream('./huge.zip')
  .pipe(fs.createWriteStream('./backup/huge.zip'))
  .on('finish', () => console.log('Copy complete'));
```

Or using the modern `pipeline` utility for better error handling:

```javascript
const { pipeline } = require('node:stream/promises');
const fs = require('node:fs');
const zlib = require('node:zlib');

async function compressFile() {
  await pipeline(
    fs.createReadStream('./data.txt'),
    zlib.createGzip(),
    fs.createWriteStream('./data.txt.gz')
  );
  console.log('Compressed successfully');
}
```

---

## 9. Common Error Codes to Handle

| Code | Meaning | Typical Fix |
|------|---------|-------------|
| `ENOENT` | File/directory doesn't exist | Check path, create parent dirs |
| `EACCES` | Permission denied | Check file permissions, run with proper access |
| `EISDIR` | Expected file, got directory | Validate input paths |
| `EEXIST` | File already exists | Use `force: true` or check first |
| `ENOTEMPTY` | Directory not empty | Use `fs.rm()` with `recursive: true` |

---

## 10. Quick Reference Cheat Sheet

```javascript
const fs = require('node:fs/promises');

// READ
await fs.readFile(path, 'utf-8');        // string
await fs.readFile(path);                  // Buffer (binary)

// WRITE
await fs.writeFile(path, data);           // overwrite
await fs.appendFile(path, data);          // append

// DIRECTORY
await fs.mkdir(path, { recursive: true });
await fs.readdir(path, { withFileTypes: true });
await fs.rm(path, { recursive: true, force: true });

// INFO
await fs.stat(path);                      // metadata
await fs.access(path);                    // existence check

// COPY / MOVE
await fs.copyFile(src, dest);
await fs.rename(oldPath, newPath);
```

---

## Key Takeaways

1. **Always use `fs/promises`** with `async/await` for cleaner code
2. **Use streams** for anything over a few MB — don't buffer huge files in memory
3. **Use `recursive: true`** with `mkdir` to avoid "directory doesn't exist" errors
4. **Use `fs.rm()`** (not `rmdir`) for deleting folders with contents
5. **Check `err.code`** for specific error handling rather than generic catches

Want me to show you a specific pattern — like building a recursive file tree walker, or a safe file upload handler?
