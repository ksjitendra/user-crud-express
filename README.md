# Express.js Project with PostgreSQL and Sequelize

This project is an Express.js application using PostgreSQL as the database. It also leverages Sequelize as the ORM for database management, including migrations. The project is compatible with Node.js 20.

## Prerequisites

Before running the project, ensure you have the following installed on your system:

- **Node.js 20.x**
- **npm** (Node Package Manager) or **yarn**
- **PostgreSQL** (Make sure PostgreSQL is running and accessible)
- **Git** (to clone the repository)

## Project Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/ksjitendra/user-crud-express.git
   cd user-crud-express
   ```

   ```bash
   npm install
   ```

   ```bash
   cp .env.example .env
   ```

2. **create db and add details in the .env file:**

3. **migrate the db**

   ```bash
   npx sequelize-cli db:migrate
   ```

4. **start the application**

   ```bash
   npm start
   ```

5. **running test cases**

   ```bash
   npm test
   ```
