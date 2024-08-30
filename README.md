# Northcoders News API

## Overview
The Northcoders News API is a backend service developed to provide data for a news website. Built using JavaScript, Node.js, Express, and PostgreSQL, the API follows the MVC (Model-View-Controller) layout to ensure a clean and maintainable coding structure.

## Run the live version of this here! https://nc-news-backend-f7vf.onrender.com

## How to run this locally yourself 

Before you begin, you need to have the following software installed on your machine

- `PostgreSQL`
- `Node.js`

### Clone the Repository

To run this project on your local machine, start by cloning this repo

```bash
git clone https://github.com/IbznVI/NC-News-backend.git
```
To run this on your own machine after cloning it, you must create your own .env files.
first create two .env files with the .env name and conftaining the following information;

```bash
.env.test
PGDATABASE=nc_news_test

.env.development
PGDATABASE=nc_news
```

You'll need to install the following dependencies:
- `jest`
- `jest-sorted`
- `pg`
- `pg-format`
- `dotenv`
- `express`
- `supertest`

To set up the database run these commands:
```bash
npm run setup-dbs

npm run seed
```

Run the tests with the following command
```bash
npm run test
```
Now that its finally up and running, you can try out the following endpoints:

- `GET /api`: get more information regarding all endpoints available
- `GET /api/topics`: get all topics
- `GET /api/articles`: get all articles (queries: sort_by, order, topic, limit, page)
- `GET /api/users`: get all users
- `GET /api/articles/:article_id`: get an article by article id (queries: limit, page)
- `PATCH /api/articles/:article_id`: update an article by article id
- `GET /api/comments/:comment_id`: get a comment by article id
- `POST /api/comments/:comment_id`: post a comment by article id
- `DELETE /api/comments/:comment_id`: delete a comment by article id

## Created by Ibrahim Ahmed - [LinkedIn](www.linkedin.com/in/ibrahim-ahmed8)

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
