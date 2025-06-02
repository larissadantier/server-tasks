import type { FastifyPluginAsync } from 'fastify'

export const taskRouter: FastifyPluginAsync = async fastify => {
  fastify.get('/', (req, reply) => {
    reply.code(200).send({ message: true })
  })
}
