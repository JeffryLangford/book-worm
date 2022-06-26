const { REPL_MODE_SLOPPY } = require('repl');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Post model
class Post extends Model {
     static upvote(body, models) {
         return models.Vote.create({
             user_id: body.user_id,
             post_id: body.post_id
         }).then(() => {
             return Post.findOne({
                 where: {
                     id: body.post_id
                 },
                 attributes: [
                     'id',
                     'post_url',
                     'title',
                    'post_text',
                     'created_at',
                     [
                        sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
                        'vote_count'
                    ]
                 ]
             });
         });
     }
      
}

//create fields/columns for Post Model
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
        post_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        post_text: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            } 
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true, // <--sequalize columns are camel case by default
        modelName: 'post'
    }
)

module.exports = Post;