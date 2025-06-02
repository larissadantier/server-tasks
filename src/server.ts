import fastifyPostgres from '@fastify/postgres'
import Fastify from 'fastify'
import { routes } from './routes'

const fastify = Fastify({
  logger: true,
})

fastify.register(fastifyPostgres, {
  connectionString: '',
})

fastify.register(routes)

fastify.setErrorHandler((err, _, reply) => {
  reply.code(500).send({ message: err.message })
})

function init() {
  fastify.listen(
    {
      port: Number(process.env.SERVER_PORT),
      host: process.env.SERVER_HOST,
    },
    err => {
      if (err) {
        fastify.log.error(err)
        process.exit(1)
      }

      fastify.log.info(`🔥 Server Running on port ${process.env.SERVER_PORT}`)
    }
  )
}

init()
