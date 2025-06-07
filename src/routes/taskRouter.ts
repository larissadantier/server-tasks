import type { FastifyPluginAsync } from 'fastify'
import TaskController from '../controllers/taskController'

export const taskRouter: FastifyPluginAsync = async fastify => {
  fastify.get('/', TaskController.index)
  fastify.put('/:id', TaskController.update)
  fastify.post('/', TaskController.store)
  fastify.delete('/:id', TaskController.delete)
}
