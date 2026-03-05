# To-Do List Web Application

A simple task management web app built with HTML, CSS, JavaScript, and PHP with a MySQL database. This project allows users to create, view, edit, and delete tasks with status tracking for each one.

---

## Group Members

| Name                    | Role   |
|-------------------------|--------|
| Cimafranca, Jearim      | Leader |
| Canlas, Hailie          | Member |
| Balane, Nino            | Member |
| Salihuddin, Hezron      | Member |
| Abueva, Bien            | Member |
| Lagrama, JP             | Member |
| Remopalos, Ronan        | Member |

---

## Project Files

| File             | Description                                      |
|------------------|--------------------------------------------------|
| `index.html`     | Main page structure and layout                   |
| `style.css`      | All styling for the application                  |
| `script.js`      | Frontend logic (fetch, render, form handling)    |
| `api.php`        | Backend API handling CRUD operations             |
| `config.php`     | Database connection setup                        |
| `database.sql`   | SQL script to create the database and table      |
| `sql_structure.txt` | Text description of the database structure    |

---

## SQL Data Structure

**Database:** `todo_db`

**Table:** `tasks`

| Column      | Type                                     | Details                     |
|-------------|------------------------------------------|-----------------------------|
| id          | INT                                      | Primary Key, Auto Increment |
| title       | VARCHAR(255)                             | Required                    |
| description | TEXT                                     | Optional                    |
| status      | ENUM('pending', 'on-going', 'completed') | Default: `pending`          |

- **id** — Unique identifier, automatically assigned to each task.
- **title** — The task name. This field is required.
- **description** — Extra details about the task. Can be left blank.
- **status** — Tracks where the task is at: `pending`, `on-going`, or `completed`.

---

## How to Run

1. Import `database.sql` into your MySQL server (via phpMyAdmin or CLI).
2. Place all project files in your local server directory in wamppserver64/wwww.
3. Open `index.html` through your local server (e.g. `http://localhost/todo/`).

---

## Features

- Add tasks with a title and optional description
- View all tasks with live status counts (Total, Pending, On-going, Done)
- Edit task title, description, and status via a modal
- Delete tasks with a confirmation prompt
- Clean, minimal UI with status badges and visual indicators
