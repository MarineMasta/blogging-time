const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// posts
class Post extends Model {}

Post.init(
    {
      id: {
        //id number
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        //post's title
        type: DataTypes.STRING,
        allowNull: false
      },
      post_content: {
        //words within post
        type: DataTypes.TEXT,
        allowNull: true
      },
      user_id: {
        //id of user who posted
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'post'
    }
  );

  module.exports = Post;