<<<<<<< HEAD
const Choice = require("./Choice");
const Comment = require("./Comment");
const Like = require("./Like");
const Post = require("./Post");
const User = require("./User");


//many to many relationship - defined in votes model
User.belongsToMany(Post, {
    through: Like,
    // as: 'liked_posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Like,
    // as: 'liked_posts',
    foreignKey: 'post_id'
});


//additional associations for many to many relationship to work
Like.belongsTo(User, {
    foreignKey: 'user_id'
});

Like.belongsTo(Post, {
    foreignKey: 'post_id'
});

Choice.belongsTo(User, {
    foreignKey: 'choice_id'
})

User.hasMany(Like, {
    foreignKey: 'user_id'
});

Post.hasMany(Like, {
    foreignKey: 'post_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

module.exports = {
    Choice,
    Comment,
    Like,
    Post,
    User
}
=======
const User = require('./User');

module.exports = { User }
>>>>>>> c74fffa4b8817336ac260c67bfc28a21415b6292
