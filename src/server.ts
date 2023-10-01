import { Server } from '@hapi/hapi'
import { routes } from './routes'

const init = async () => {
  const server: Server = new Server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  })
  server.route(routes)
  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
