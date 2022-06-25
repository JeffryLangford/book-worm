const { User } = require('../models');

const userData = [
    {
        username: "Harry Potter",
        email: "h.potter@hogwarts.edu",
        password: "obliviate!"
    },
    {
        username: "Tom Smith",
        email: "ts@google.com",
        password: "widget22!"
    },
    {
        username: "Meg Ribbon",
        email: "megribbon@alliance.com",
        password: "Itsatrap!"
    },
    {
        username: "David Bowman",
        email:"d.bowman@odyssey.gov",
        password:"hal9000"
    },
    {
        username:"Anne Jones",
        email: "annejones@gmail.com",
        password:"happythoughts22!"
    }
];

const seedUsers = () => User.bulkCreate(userData);
module.exports=seedUsers;