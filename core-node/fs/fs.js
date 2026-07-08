const fs = require("node:fs/promises");

async function readConfig() {
  try {
    const data = await fs.readFile("./config.json", "utf-8"); // utf-8 is require if we do not want to get buffer
    const config = JSON.parse(data);
    console.log(config);
  } catch (err) {
    console.error("feild to read the config", err.message);
  }
}

readConfig();

// Key points:
// Always pass 'utf-8' as the second argument, or you get a raw Buffer
// Without encoding: const buffer = await fs.readFile('./image.png'); — useful for binary data
