### 3jhakri API

3jhakri is a online based food ordering company, mailny focusing in official orders and deliveries.
This is a api for 3jhakri webapp and mobile app.

## Installation

# Pre-requisites

- [Node.js](https://yarnpkg.com/en/docs/install) - 8.9.0 or above
- [Yarn](https://yarnpkg.com/en/docs/install) - 1.7.0 or above
- [NPM](https://docs.npmjs.com/getting-started/installing-node) - 5.5.1 or above

Clone the repository, install the dependencies and get started right away.

$ git clone https://github.com/tiwarirabi/3jhakriapi.git
$ cd 3jhakriApi
$ yarn install

# .env

Make a copy of `.env.example` as `.env` and set the required variables.

# Database migration

This will create a replica of the database structure in your machine.

$ yarn migrate:latest

# Dummy data seeding

This will seed dummy data into your database.

$ yarn knex seed:run


Finally, start the application by.

$ yarn start

Navigate to http://localhost:8080/info to verify installation.
