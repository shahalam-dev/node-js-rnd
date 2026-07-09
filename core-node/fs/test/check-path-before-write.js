const fs = require("node:fs/promises")
const path = require("node:path")

async function safeWrite(filePath, data) {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true }); // create nested dir if needed

  await fs.writeFile(filePath, data)
}


safeWrite('./data/safewrite/data.json', '{"success": true}')
