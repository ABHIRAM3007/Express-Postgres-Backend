# Express PostgreSQL Backend

A clean REST backend built with Node.js, Express and PostgreSQL. This project focuses on practical backend architecture: controllers, services, repositories, JWT authentication, validation, pagination and database-backed CRUD.

## Features
- RESTful API design
- JWT authentication
- PostgreSQL data access with parameterized queries
- Controller/service/repository separation
- Product catalog CRUD
- Search and pagination
- Request validation
- Centralized error handling

## Stack
Node.js, Express, PostgreSQL, `pg`, JWT, bcrypt, Zod.

## Setup
```bash
npm install
cp .env.example .env
# create the database and run src/db/schema.sql
npm run dev
```

## Endpoints
`POST /api/auth/register`  `POST /api/auth/login`

`GET /api/products`  `POST /api/products`  `GET /api/products/:id`  `PATCH /api/products/:id`  `DELETE /api/products/:id`

The project is independently implemented to demonstrate backend fundamentals suitable for portfolio and interview discussion.