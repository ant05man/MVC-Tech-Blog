// Imports 'dotenv' module and loads environment variables from a .env file into process.env
// used to store configuration variables like database credentials securely
require('dotenv').config();

// Imports the Sequelize library, a popular Object-Relational Mapping(ORM) library for working in databases in Node.js
const Sequelize = require('sequelize')

// sets up Sequelize connection to database, checks if there is JAWSDB_URL environment variables
// variable provided on hosting platform like Heroku, that has mysql database add-on called JAWSDB
// if JAWSDB_URL exists, uses it as the database connection URL, if not then falls back to using individual environment variables for database connection parameters
const sequelize = process.env.JAWSDB_URL
    //TERNARY conditional statement that says IF JAWSDB_URL exists, creates Sequelize instance using that URL, IF NOT the creates Sequelize instance using the following parameters
    // JAWSDB_URL is a cloud-based deployment used to configure the database connection
    ? new Sequelize (process.env.JAWSDB_URL)
    : new Sequelize (process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DATABASE_URL,
        dialect: 'mysql',
        dialectOptions: {
            decimalNumbers: true,
        },
    });
    // exporting the instance so it can be used throughout the app
    module.exports = sequelize;