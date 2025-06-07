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

  async findById(fastify: FastifyInstance, id: number) {
    const { rows } = await fastify.pg.query(
      'SELECT * FROM tasks WHERE id = $1 LIMIT 1',
      [id]
    )

    return rows[0]
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

  async update(
    fastify: FastifyInstance,
    id: number,
    body: { title?: string; description?: string }
  ) {
    const { rows } = await fastify.pg.query(
      `
        UPDATE tasks 
        SET 
          title = COALESCE($1, title), 
          description = COALESCE($2, description),
          updated_at = current_timestamp
        WHERE id = $3 
        RETURNING *
      `,
      [body.title, body.description, id]
    )

    return rows[0]
  }

  async delete(fastify: FastifyInstance, id: number) {
    await fastify.pg.query('DELETE FROM tasks WHERE id = $1', [id])
  }
}

export default new TaskRepository()
