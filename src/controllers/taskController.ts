import type { FastifyReply, FastifyRequest } from 'fastify'
import TaskRepository from '../repositories/taskRepository'

class TaskController {
  async index() {}

  async store(
    req: FastifyRequest<{ Body: { title: string; description?: string } }>,
    reply: FastifyReply
  ) {
    const { body } = req

    if (!body.title) {
      return reply.code(400).send({
        code: 'TITLE_REQUIRED_FIELD',
        message: 'The title is missing or invalid.',
      })
    }

    const task = await TaskRepository.create(req.server, body)

    reply.code(200).send(task)
  }
}

export default new TaskController()
