import fs from 'node:fs'
import {stat} from 'node:fs/promises'

const date = new Date()
const now = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`


// Watch entire directory recursively
const watcher = fs.watch('./watch', { recursive: true }, async (event, file) => {
  // const s = await stat(`./watch/${file}`)

  let data = `${now} [file: ${file} - event: ${event}`
  fs.appendFile('./log/file-watch.log', data, 'utf-8', () => console.log(data))

});



// Stop watching
// watcher.close();
