<p align="center">
  <a href="#-tech-stack">Tech Stack</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-task-manager-api">Task Manager API</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>
</p>

## 📝 Task Manager API

A simple RESTful API for managing tasks (CRUD + bulk import via CSV).

## 💾 Tech Stack

- [Node.js](https://nodejs.org/en)  
- [Fastify](https://fastify.dev)
- [Postgresql](https://www.postgresql.org)
- [Docker](https://www.docker.com)
- File handling for CSV import  

## 📌 Features

- Create a task  
- List all tasks (with optional search)  
- Update a task by `id`  
- Delete a task by `id`  
- Mark/unmark a task as completed  
- Import tasks in bulk using a CSV file  

## 📦 Task Structure

Each task has the following properties:

| Field         | Type          | Description                                                  |
|---------------|---------------|--------------------------------------------------------------|
| `id`          | string        | Unique identifier for the task                               |
| `title`       | string        | Task title                                                   |
| `description` | string        | Detailed task description                                    |
| `completed_at`| datetime/null | Timestamp when the task was completed (initially `null`)     |
| `created_at`  | datetime      | Timestamp when the task was created                          |
| `updated_at`  | datetime      | Timestamp when the task was last updated                     |

## 🚀 API Endpoints

### `POST /tasks`

Create a new task.

**Request Body:**

```json
{
  "title": "Task Title",
  "description": "Task Description"
}
```

**Behavior:**
- `id`, `created_at`, and `updated_at` are auto-generated.  
- `completed_at` is initially set to `null`.

### `GET /tasks`

List all tasks. Supports optional filtering by `title` and/or `description`.

**Query Params (optional):**

```
?title=example&description=details
```

### `PUT /tasks/:id`

Update a task's `title` and/or `description`.

**Request Body:**

```json
{
  "title": "Updated Title",
  "description": "Updated Description"
}
```

**Rules:**
- You can update either `title`, `description`, or both.  
- `updated_at` is updated on change.  
- Must validate the task exists before updating.

### `DELETE /tasks/:id`

Delete a task by `id`.

**Rules:**
- Validate task existence before deletion.

### `PATCH /tasks/:id/complete`

Toggle a task’s completion status.

**Behavior:**
- If `completed_at` is `null`, set it to the current timestamp.  
- If `completed_at` has a value, reset it to `null`.

### `GET /tasks/export-csv`

Bulk import tasks from a CSV file.

**CSV Format:**

```
id,title,description
1,Task 1,Description for Task 1
2,Task 2,Description for Task 2
...
```

**Behavior:**
- All imported tasks follow the same creation rules as `POST /tasks`.

## 🛠️ Setup & Run

```bash
# Clone the repository

git clone https://github.com/larissadantier/server-tasks.git

# Install all packages

- Npm
npm install

- Yarn
yarn install

- Pnpm
pnpm install

After all this, you're ready to run the project, just enter the command:

- Docker
pnpm docker:up

- Npm
npm run dev

- Yarn
yarn dev

- Pnpm
pnpm dev

- Bun
bun dev

All done! Now your application will run 😄

```

## 🧪 Testing (Optional)

You can use tools like [Postman](https://www.postman.com), [Insomnia](https://insomnia.rest) or [Yaak](https://yaak.app) to test each route.

## 📝 License

This project is under the MIT license. See the [LICENSE](LICENSE) file for more details.

## 👀 Autor
<div align="center">
  <a href="https://app.rocketseat.com.br/me/larissadantier">
   <img align="center" style="border-radius: 100%;" src="https://avatars3.githubusercontent.com/u/61429963?s=400&u=0182f2fa598437842398e2f08f5dc6622df0b432&v=4" width="100px;" alt=""/>
  </a>
</div>
<br/>
<p align="center">Developed por Larissa Dantier 🚀 </p> 
<p align="center">Contact us 👏 </p>
<div align="center">
<a href="https://www.linkedin.com/in/larissadantier/" target="_blank">
    <img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>&nbsp;&nbsp;
 <a href="https://www.instagram.com/larissa.dantier/" target="_blank">
    <img src="https://img.shields.io/badge/instagram-%23E4405F.svg?&style=for-the-badge&logo=instagram&logoColor=white" />        
  </a>&nbsp;&nbsp;
 <a href="mailto:larissa_dantier@hotmail.com">
    <img src="https://img.shields.io/badge/Microsoft_Outlook-0078D4?style=for-the-badge&logo=microsoft-outlook&logoColor=white" />        
  </a>&nbsp;&nbsp; 
</div>
