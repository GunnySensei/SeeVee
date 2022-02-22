const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

// Comment model
Comment.init(
    {
        id: { type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        code_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'code',
                key: 'id'
            }
        },
        job_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'job',
                key: 'id'
            }
        }
        
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);

module.exports = Comment;