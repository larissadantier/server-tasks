import type { FastifyInstance } from 'fastify'

class TaskRepository {
  async findAll(fastify: FastifyInstance) {}

  async create(
    fastify: FastifyInstance,
    payload: { title: string; description?: string }
  ) {
    const { rows } = await fastify.pg.query(
      'INSERT INTO tasks (title, description) VALUES($1, $2) RETURNING *',
      [payload.title, payload.description]
    )

    return rows[0]
  }
}

export default new TaskRepository()
