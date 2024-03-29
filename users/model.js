const Sequelize = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define(
  'users',
  {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'users',
    logging: false
  })

module.exports = User