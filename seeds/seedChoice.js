const {Choice} = require('../models');

const choiceData = [
    {
        user_id:1,
        post_id:1,
        title:"I Got an Itch",
        author: "Homer Fulton",
        genre: "Autobiography"
    },
    {
        user_id:2,
        post_id:2,
        title:"Let's Go Hunting",
        author: "Miles Turner",
        genre: "Non Fiction"
    },
    {
        user_id:3,
        post_id:3,
        title:"That Dog is Dead",
        author: "June Bugg",
        genre: "Fiction"
    },
    {
        user_id:4,
        post_id:4,
        title:"Billy Found a Body",
        author: "Simon Gardner",
        genre: "Mystery"
    },
    {
        user_id:5,
        post_id:5,
        title:"Dark Web Horror Stories",
        author: "Bosco McGee",
        genre: "Non Fiction"
    },
    {
        user_id:1,
        post_id:6,
        title:"From Homeless to Billionaire in 30 Days",
        author: "Leroy Fuller",
        genre: "Non Fiction"
    },
    {
        user_id:2,
        post_id:7,
        title:"Jump for Joy",
        author: "Rev Mike Young",
        genre: "Spiritual"
    },
    {
        user_id:3,
        post_id:8,
        title:"The Cat Who Stole My Cell Phone",
        author: "John Doe",
        genre: "Humor"
    },
    {
        user_id:4,
        post_id:9,
        title:"My Momma Said No",
        author: "Juniper Culver",
        genre: "Fiction"
    },
    {
        user_id:5,
        post_id:10,
        title:"BBQ That'll Send You to Heaven",
        author: "Calvin Hughes",
        genre: "Cooking"
    }
]

const seedChoices = () => Choice.bulkCreate(choiceData);
module.exports=seedChoices;