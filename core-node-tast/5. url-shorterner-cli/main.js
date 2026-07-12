import fsP from 'node:fs/promises'
import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import crypto from 'node:crypto'

const rl = readline.createInterface({ input, output })
const port = 3330

function validateURL(urlString) {
  try {
    const url = new URL(urlString);
    return {
      valid: true,
      ...url
    };
  } catch (error) {
    return {
      valid: false,
      error: error.message
    };
  }
}



async function run() {
  const urlDB = JSON.parse(await fsP.readFile('./url.json'))
  const inputUrl = await rl.question('enter the url: ')
  const isValidUrl = validateURL(inputUrl)

  if (isValidUrl.valid) {
    const randomUUID = crypto.randomUUID()
    urlDB[randomUUID] = { url: inputUrl, createdAt: new Date(), click: 0 }
    await fsP.writeFile('./url.json', JSON.stringify(urlDB))
    console.log(`your short url is: http://localhost:${port}/${randomUUID}`)
  } else {
    console.log(`the "${inputUrl}"" is not a valid url`)
  }

}

run()









// ### 5. **URL Shortener CLI Tool**
// **Modules:** `url`, `querystring`, `fs`, `process`

// **Task:** Build a command-line tool that:
// - Accepts a URL as input
// - Generates a short code (e.g., using crypto or simple counter)
// - Saves mapping in a JSON file
// - Can resolve short code back to original URL
// - Parse and validate URLs using `URL` class

// **Hint:**
// - `new URL(inputUrl)` for validation
// - `URLSearchParams` for query parameter manipulation
// - Store mappings as `{ shortCode: { url, createdAt, clicks } }`
