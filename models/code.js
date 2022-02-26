const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Code extends Model {
  static upvote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      code_id: body.code_id,
    }).then(() => {
      return Code.findOne({
        where: {
          id: body.code_id,
        },
        attributes: [
          "id",
          "title",
          "code_url",
          "user_id",
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM vote WHERE code.id = vote.code_id)"
            ),
            "vote_count",
          ],
        ],
        order: [["created_at", "DESC"]],
        include: [
          {
            model: Comment,
            attribute: [
              "id",
              "comment_text",
              "code_id",
              "user_id",
              "created_at",
            ],
            include: {
              model: User,
              attributes: ["username"],
            },
          },
          {
            model: User,
            attributes: ["username"],
          },
        ],
      });
    });
  }
}

// Code model
Code.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "code",
  }
);

module.exports = Code;
