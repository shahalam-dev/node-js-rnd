import http from 'node:http'

const tasks = [
  {
    "id": 1,
    "title": "coocking fish"
  },
  {
    "id": 2,
    "title": "doing dishes"
  }
]

const routes = {
  'GET /tasks': async (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(tasks))
  }
}

http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`)
  console.log(req.headers.host)
  const handler = routes[`${req.method} ${url.pathname}`]

  if (handler) {
    handler(req, res).catch((err) => {
      res.writeHead(500)
      res.end(err.message)
    })
  } else {
    res.writeHead(404)
    res.end('not found')
  }
}).listen(3344)
