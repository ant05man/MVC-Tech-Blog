const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model { }

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        // url: {
        //     type: DataTypes.STRING,
        //     allowNull: true
        // }, 
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
    // Database connection
        sequelize,
    // Prevents Sequelize from automatically pluralizing table name
        freezeTableName: true,
    //Use underscores in column names
        underscored: true,
    // The name of the model
        modelName: 'post'
    }
);

// Exporting this model to make available for use in other parts of the application
module.exports = Post;