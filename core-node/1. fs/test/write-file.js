const fs = require("node:fs/promises")

async function writeFile(msg) {
  // Overwrites existing content
  await fs.writeFile('./output.txt', msg, 'utf-8');

  // Adds to end of file (creates if doesn't exist)
  await fs.appendFile("./write-log.txt", `${new Date().toISOString()} - ${msg}\n`);
}

writeFile('hello world');
