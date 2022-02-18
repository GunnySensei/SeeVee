const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
    static upvote(body, models) {
        return models.Vote.create({
            user_id: body.user_id
        }).then (() => {
            return User.findOne({
                where: {
                    id: body.user_id
                },
                attributes: [
                    'id',
                    'username',
                    'email',
                    [
                        sequelize.literal('(SELECT COUNT (*) FROM vote WHERE user.id = vote.user_id)'),
                        'vote_count'
                    ]
                ],
                include: [
                    {
                        model: models.Comment,
                        attributes: ['id', 'comment_text', 'user_id', 'created_at']
                    }
                ]
            });
        });
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5]
            }
        },
        languages: {
            type: DataTypes.STRING
        }
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 12);
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 12);
                return updatedUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;