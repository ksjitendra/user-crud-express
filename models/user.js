const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../config/db-connection')

const User = sequelize.define(
    'users',
    {
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true, // checks for email format (foo@bar.com)
            },

            // allowNull defaults to true
        },
        role: {
          type: DataTypes.ENUM,
          values: ['admin', 'user'],
          defaultValue: 'user',
          allowNull: false
        }
       
    },
    {
        // Other model options go here
        timestamps: true,
        tableName: 'users',
    }
)

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User) // true

module.exports = User
