const { Sequelize } = require('sequelize')

const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbHost  = process.env.DB_HOST 

const sequelize = new Sequelize(dbName, dbUser, dbPassword , {
    host: process.env.DB_HOST,
    dialect:
        'postgres' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
})

try {
    sequelize.authenticate()
    console.log('Connection has been established successfully.')
} catch (error) {
    console.error('Unable to connect to the database:', error)
}

module.exports = sequelize