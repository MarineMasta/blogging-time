const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//comments on posts
class Comment extends Model {}

//using similar model/format as last homework
Comment.init(
  {
    id: {
      //ID NUMBER
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      user_id: {
        //USER ID
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      post_id: {
        //ID for post
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'post',
          key: 'id'
        }
      },
      comment_text: {
        //words within comment
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
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