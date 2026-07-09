import fsP from 'node:fs/promises'
import  readline  from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const rl = readline.createInterface({ input, output })


const now = new Date()
const logFile = `app-${now.getFullYear()}-${now.getMonth()}-${now.getDay()}.log`
const timestamp = now.toISOString().replace('T', ' ').slice(0, 19)
const flags = ['INFO', 'WARN', 'ERROR']



async function isLogDirExist() {
  try {
    await fsP.access('./logs')
    return true
  } catch (e) {
    return false
  }
}


async function run() {
  const isDirExist = await isLogDirExist()
  if (!isDirExist) {
    await fsP.mkdir('./logs')
  }

  // Handle Ctrl+C gracefully
  rl.on('SIGINT', () => {
    console.log('\nExiting...')
    rl.close()
    process.exit(0)
  })

  let input = ''
  while (input != 'q') {
    input = await rl.question('Enter log or type q to exit: ')
    if (input == 'q') break

    let flag = parseInt(await rl.question('Enter log flag (INFO : 1 | WARN: 2 | ERROR: 3): '))
    while (isNaN(flag)  || flag < 1 || flag > 3) {
      console.log('wrong flag!')
      flag = parseInt(await rl.question('Enter correct flag (INFO : 1 | WARN: 2 | ERROR: 3): '))
    }
    const log = `${timestamp} - ${flags[flag - 1]} - [${input}] \n`
    await fsP.appendFile(`./logs/${logFile}`, log)

    console.log('log inserted: ', log)
  }

  rl.close()
}

run()



// ### 1. **File System Logger**
// **Modules:** `fs`, `path`, `process`

// **Task:** Create a logging system that:
// - Writes logs to a file named `app-{date}.log` in a `logs/` directory
// - Each log entry includes timestamp, log level (INFO/WARN/ERROR), and message
// - Also prints logs to console with color coding
// - Use `process.argv` to accept a log message as command-line argument

// **Hint:**
// - Use `fs.appendFileSync` or `fs.promises.appendFile`
// - `path.join()` for cross-platform paths
// - `process.argv` to get command-line arguments
