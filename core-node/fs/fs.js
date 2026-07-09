import fsp from 'node:fs/promises'
import fs from 'node:fs'
import { constants } from 'node:fs'


const readFile = await fsp.readFile('./read.txt', 'utf-8')
// console.log(file)


const stream = fs.createReadStream('./test/log.txt', 'utf-8')
// stream.on('data', (chunk) => console.log(chunk))
// stream.on('end', () => console.log('Done'))

const files = await fsp.readdir('./', { withFileTypes: true })
// for (const f of files) {
//   console.log(f.name, f.isDirectory() ? 'Dir' : 'Files')
// }

await fsp.writeFile('./write-data.txt', 'test data \n')
await fsp.appendFile('./write-data.txt', 'append data')

const ws = fs.createWriteStream('./log.txt')
ws.write('log 1 \n')
ws.write('log 2 \n')
ws.write('log 3 \n')
ws.write('log 4 \n')
ws.end('final chunk')

// Directory
//
await fsp.mkdir('./a/b/c', { recursive: true })
await fsp.rm('./a', { recursive: true, force: true })

const st = await fsp.stat('./test')
// console.log(st)

try {
  await fsp.access('./file.txt')
} catch (e) {
  console.log('file does not exist')
}

const checkPermission = await fsp.access('./file.txt', constants.R_OK | constants.W_OK)
// console.log(checkPermission)


/*

- need to deep dive into checkPermission constants and this returns

*/
