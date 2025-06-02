import type { FastifyPluginAsync } from 'fastify'

import { taskRouter } from './taskRouter'

export const routes: FastifyPluginAsync = async fastify => {
  fastify.register(taskRouter, { prefix: '/tasks' })
}
