import type { FastifyPluginAsync } from 'fastify'
import TaskController from '../controllers/taskController'

export const taskRouter: FastifyPluginAsync = async fastify => {
  fastify.get('/', TaskController.index)
  fastify.put('/:id', TaskController.update)
  fastify.patch('/:id/complete', TaskController.complete)
  fastify.post('/', TaskController.store)
  fastify.delete('/:id', TaskController.destroy)
}
