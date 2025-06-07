import type { FastifyInstance } from 'fastify'

class TaskRepository {
  async findAll(fastify: FastifyInstance, query?: { search?: string }) {
    const { rows } = await fastify.pg.query(
      `
      SELECT *
      FROM tasks
      WHERE (
          $1 = ''
          OR title       ILIKE $1 || '%'
          OR description ILIKE $1 || '%'
      )
      ORDER BY id
      `,
      [query?.search]
    )

    return rows
  }

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
