const{Comment} = require('../models');

const commentData = [
    {
        comment_text:"Yes, but...",
        user_id: 5,
        post_id: 1
    },
    {
        comment_text:"In a way, however...",
        user_id: 4,
        post_id: 2
    },
    {
        comment_text:"I'd say you have a winner...",
        user_id: 3,
        post_id: 3
    },
    {
        comment_text:"Don't quit your day job...",
        user_id: 2,
        post_id: 4
    },
    {
        comment_text:"Ooh, I like that too...",
        user_id: 1,
        post_id: 5
    },
    {
        comment_text:"You crazy SOB...",
        user_id: 1,
        post_id: 5
    },
    {
        comment_text:"Absolutely!",
        user_id: 2,
        post_id: 4
    },
    {
        comment_text:"Well on the other hand...",
        user_id: 3,
        post_id: 3
    },
    {
        comment_text:"Go tell it on the mountain...",
        user_id: 4,
        post_id: 2
    },
    {
        comment_text:"Take a chill pill...",
        user_id: 5,
        post_id: 1
    }
]

const seedComments = () => Comment.bulkCreate(commentData);
module.exports=seedComments;