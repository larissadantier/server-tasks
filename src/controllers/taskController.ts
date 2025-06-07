import type { FastifyReply, FastifyRequest } from 'fastify'
import TaskRepository from '../repositories/taskRepository'

class TaskController {
  async index(
    req: FastifyRequest<{ Querystring: { search?: string } }>,
    reply: FastifyReply
  ) {
    const { query } = req

    const search = query?.search?.trim() || ''

    const tasks = await TaskRepository.findAll(req.server, {
      search: search,
    })

    reply.code(200).send({ data: tasks })
  }

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

    reply.code(201).send(task)
  }

  async update(
    req: FastifyRequest<{
      Body: { title?: string; description?: string }
      Params: { id: number }
    }>,
    reply: FastifyReply
  ) {
    const { params, body } = req

    if (!body) {
      reply.code(400).send({
        code: 'BODY_IS_EMPTY',
        message: 'The body with title or description is required.',
      })

      return
    }

    if (!params.id) {
      reply.code(400).send({
        code: 'QUERY_ID_PARAM_NOT_FOUND',
        message: "The query 'id' of task is required.",
      })

      return
    }

    const task = await TaskRepository.findById(req.server, params.id)

    if (!task) {
      reply.code(404).send({
        code: 'TASK_NOT_FOUND',
        message: 'The requested task does not exists.',
      })

      return
    }

    const updatedTask = await TaskRepository.update(req.server, params.id, body)

    reply.code(200).send(updatedTask)
  }

  async complete(
    req: FastifyRequest<{
      Params: { id: number }
    }>,
    reply: FastifyReply
  ) {
    const { params } = req

    const task = await TaskRepository.findById(req.server, params.id)

    if (!task) {
      reply.code(404).send({
        code: 'TASK_NOT_FOUND',
        message: 'The requested task does not exists.',
      })

      return
    }

    const taskCompleted = await TaskRepository.completeTask(
      req.server,
      params.id
    )

    reply.code(200).send(taskCompleted)
  }

  async destroy(
    req: FastifyRequest<{
      Params: { id: number }
    }>,
    reply: FastifyReply
  ) {
    const { params } = req

    if (!params.id) {
      reply.code(400).send({
        code: 'QUERY_ID_NOT_FOUND',
        message: "The query 'id' of task is required.",
      })

      return
    }

    const task = await TaskRepository.findById(req.server, params.id)

    if (!task) {
      reply.code(400).send({
        code: 'TASK_NOT_FOUND',
        message: 'The requested task does not exists.',
      })

      return
    }

    await TaskRepository.delete(req.server, params.id)

    reply.code(200).send({ success: true })
  }
}

export default new TaskController()
