import {readFile, watchFile} from "node:fs";
import path from "node:path";
import { promisify, inspect } from 'node:util';

class FileUtility {
  constructor(configPath) {
    this.configPath = path.resolve(configPath)
    this.config = null
    this.maxRetries = 3
    this.retryDelay = 1000
  }


  async readConfig() {
    try {
      const readFilePromisify = promisify(readFile)
      this.config = JSON.parse(await readFilePromisify(this.configPath))
      return this.config
    } catch (err) {
      console.log(err.message)
    }
  }

  async updateConfig(path, value) {
    try {
      const writeFilePromisify = promisify(watchFile)
      await this.readConfig()
      const keys = path.split('.')

      let current = this.config
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }

      const lastKey = keys[keys.length - 1]
      if (current && current[lastKey] !== undefined) {
        current[lastKey] = value
        await writeFilePromisify(this.configPath, JSON.stringify(this.config))
      } else {
        console.log('key does not exist!')
      }
      return this.config
    } catch (err) {
      console.log(err.message)
    }

  }

  async printConfig() {
    await this.readConfig()
    console.log(inspect(this.config, {depth: null, colors: true}))
  }

}


const fileUtil = new FileUtility('./config.json')

await fileUtil.updateConfig('database.password', 'secret45000')
await fileUtil.printConfig()




// ### 4. **Promise-based File Utility**
// **Modules:** `fs/promises`, `util`, `path`

// **Task:** Create a file utility that:
// - Reads a JSON config file
// - Updates specific values
// - Writes back to the same file
// - Uses `util.inspect()` to pretty-print the config
// - Implements retry logic with `util.promisify()` on callback-based functions

// **Hint:**
// - Import from `'node:fs/promises'`
// - `JSON.parse()` and `JSON.stringify()`
// - `util.inspect(config, { depth: null, colors: true })`
