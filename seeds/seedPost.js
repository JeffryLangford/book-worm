const {Post} = require('../models');
const postData = [
    {
        title:"I'm itching to read this",
        post_url: "https://www.utexas.edu/",
        user_id: 5,
        post_text:"How now brown cow"
    },
    {
        title:"Intrigue, suspense captured in That Dog is Dead",
        post_url: "https://www.utexas.edu/",
        user_id: 4,
        post_text:"Yo Yo baby yo"
    },
    {
        title:"I don't think so",
        post_url: "https://www.utexas.edu/",
        user_id: 3,
        post_text:"There is not spoon"
    },
    {
        title:"Bring it on home, dude",
        post_url: "https://www.utexas.edu/",
        user_id: 2,
        post_text:"Let off some steam Bennett"
    },
    {
        title:"Just be honest",
        post_url: "https://www.utexas.edu/",
        user_id: 1,
        post_text:"Assimilate this"
    },
    {
        title:"Talk to the Hand",
        post_url: "https://www.utexas.edu/",
        user_id: 1,
        post_text:"One more time around the block"
    },
    {
        title:"It is what it is",
        post_url: "https://www.utexas.edu/",
        user_id: 3,
        post_text:"Drive until dawn, eat repeat"
    },
    {
        title:"What?",
        post_url: "https://www.utexas.edu/",
        user_id: 3,
        post_text:"Blue wallpaper with red carpet equals horrible combination"
    },
    {
        title:"Feed that imagination",
        post_url: "https://www.utexas.edu/",
        user_id: 4,
        post_text:"One Ring to rule them all, One Ring to find them, One Ring to bring them all, and in the darkness bind them"
    },
    {
        title:"Jibberish Lorem Ipsum and Nonsense",
        post_url: "https://www.utexas.edu/",
        user_id: 5,
        post_text:"Don't shake the nitro glycerine"
    },

]

const seedPosts = () => Post.bulkCreate(postData);
module.exports=seedPosts;