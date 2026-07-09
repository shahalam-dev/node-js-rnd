const fs = require("node:fs")
const readLine = require("node:readline")

const stream = fs.createReadStream('./log.txt')
const rl = readLine.createInterface({ input: stream })

rl.on('line', (line) => {
  console.log('prossesing: ', line)
})
