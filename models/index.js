const Choice = require("./Choice");
const Comment = require("./Comment");
const Vote = require("./Vote");
const Post = require("./Post");
const User = require("./User");
const Books = require("./Library");

//many to many relationship - defined in votes model

//=============================================
User.hasMany(Post,{
    foreignKey:'user_id'
});

Post.belongsTo(User, {
    foreignKey:'user_id'
});

User.belongsToMany(Post, {
    through: Vote,
     as: 'voted_posts',
    foreignKey: 'user_id'
});

User.hasMany(Books,{
    foreignKey:'user_id'
});

//============== early AM changes above=========

// Post.belongsToMany(User, {
//     through: Vote,
//     // as: 'liked_posts',
//     foreignKey: 'post_id'
// });


//additional associations for many to many relationship to work
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

Choice.belongsTo(User, {
    foreignKey: 'user_id'
})

Post.hasMany(Choice,{
    foreignKey:"post_id",
    OnDelete: "CASCADE"
})



User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id',
    OnDelete:'CASCADE'
    
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete:'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    OnDelete:'CASCADE'
});

module.exports = {
    Choice,
    Comment,
    Vote,
    Post,
    User,
    Books
}
