const { User } = require('../models');

const userData = [
    {
        username: "Hugh Stone",
        email: "hs@bigsandwich.com",
        password: "what!"
    },
    {
        username: "Tom Smith",
        email: "ts@google.com",
        password: "what!"
    },
    {
        username: "Meg Ribbon",
        email: "megribbon@alliance.com",
        password: "what!"
    },
    {
        username: "David Rivers",
        email:"d.rivers@abc.mil",
        password:"what!"
    },
    {
        username:"Anne Jones",
        email: "annejones@gmail.com",
        password:"what!"
    }
];

const seedUsers = () => User.bulkCreate(userData);
module.exports=seedUsers;