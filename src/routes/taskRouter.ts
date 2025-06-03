import type { FastifyPluginAsync } from 'fastify'
import TaskController from '../controllers/taskController'

export const taskRouter: FastifyPluginAsync = async fastify => {
  fastify.post('/', TaskController.store)
}
