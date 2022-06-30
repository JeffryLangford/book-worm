const router = require('express').Router();
const path = require('path');
const axios = require("axios");
const { Choice, User, Comment, Post } = require('../../models');
const Books = require('../../models/library');
//const Books = require('../../models/library');

// GET route for book recs using axios (api/books/recs) ***THIS CODE WORKS***
router.get('/recs', async (req, res) => {
  const params = new URLSearchParams();
  const category = JSON.stringify(req.body);  
    params.append("q", `${category}`);
    const request = {
      params: params
    }; 
      try {
          const response = await axios.get("https://www.googleapis.com/books/v1/volumes", request)
          //console.log(response.data);
          const answers = response.data
          //res.send(response.data);
          const { items } = answers;
          //console.log(items);
          const searchBooks = items.map(({volumeInfo: {title, authors, description, categories, imageLinks: {thumbnail}}}
            ) => ({Title: title, Author: [authors], Description: description, Category: [categories], Picture: thumbnail}));
          console.log(searchBooks);
          //res.send(searchBooks);
           // render info in library partials handlebars
          res.render('partials/book-details',{
          searchBooks
        })
      }
      catch (err) {
          console.log(err)
      }
  })

// POST route to add book recs to database(api/books/recs)*****************************
router.post('/recs', (req, res) => {
   //res.send(req.body);
   Books.create({
    title: req.body.title,
    author: req.body.author,
    user_id: req.body.user_id,
    genre: req.body.genre,
  })
    .then(answers => res.json(answers))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET route for user's books (api/books/library) ***THIS CODE WORKS*** 
  // this route can be moved to user-routes.js
router.get('/library', (req, res) => 

  Books.findAll({
    attributes: ['id',
      'user_id',
      'title',
      'author',
      'genre',    
    ],
    where: {
    user_id: req.body.user_id
  }
})
.then((answers) => {
    // destructure books
    const  books  = answers.map(({title, genre, author, user_id, id}) => ({Title: title, Author: author, Category: genre, User: user_id, Id: id}));
    console.log(books);
  
    // render info in books partials handlebars
    res.render('partials/library-details',{
        books
        });
        req.on('error', ()=> {
        console.log('Error :' );
    }) 
  })
)

/*
// POST route for user to add a new book into database (api/books/new) ***THIS CODE WORKS***
// THIS route is already in user routes(not needed)
    // add functionality for user to input data into form and add to database   
router.post('/new', (req, res) => {
  
  // insert into table
  Books.create({
       title: req.body.title,
       genre: req.body.genre,
       author: req.body.author, 
       user_id: req.body.user_id,
       post_id: req.body.post_id  
  })
  .then(answer => res.json(answer))
  
    //res.send('YOUR BOOK WAS ADDED!')
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});
*/

// DELETE route for user to delete book by id (/api/books/:id) **THIS CODE WORKS**
router.delete('/:id', (req, res) => {
  Books.destroy({
    where: {
      user_id: req.body.user_id,
      id: req.params.id
    }
  })
    .then(answer => {
      if (!answer) {
        res.status(404).json({ message: 'No book found with this id' });
        return;
      }
      res.json(answer);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET route for bestsellers (api/books/bestsellers) ***THIS CODE WORKS***
router.get('/bestsellers', async (req, res) => {
   // const category  = JSON.stringify(req.body);
   const { lists } = req.body;
   console.log(lists);

      try {
          const response = await axios.get("https://api.nytimes.com/svc/books/v3/lists/" + `${lists}`  + ".json?api-key=tZFDyz4NLXMBFeRo9UhOkGW5lVUo7Lr6")
          const answers = response.data
          //res.send(response.data);
                  // destructure object
        const { results:{ list_name, books}} = answers;
        console.log(list_name);
        
        // create a new array of bestselling books 
        const nyTimes = books.map(({rank, title, author, description, book_image}) => ({Rank: rank, Title: title, Author: author, Description: description, Picture: book_image}));
        console.log(nyTimes);
        res.render('partials/bestsellers-details',{
          nyTimes,
          list_name
        })
      }
      catch (err) {
          console.log(err)
      }
    })
     
// POST route to add a bestseller to user's library (api/books/bestsellers) ***THIS CODE WORKS***
router.post('/bestsellers', (req, res) => {
  //res.send(req.body);
  Books.create({
    title: req.body.title,
    author: req.body.author,
    user_id: req.body.user_id,
    genre: req.body.genre,
  })
    .then(answer => res.json(answer))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET route for user's dashboard (api/books/dashboard) ***THIS CODE WORKS*** 
  // this route can also be moved to user-routes.js
  // Choice table needs to be added 
router.get('/dashboard', async (req, res) => {
 const results = await User.findAll({
 
  attributes: {
    exclude: ['password'],
  },
    include: [{
        model: Post,
        include: [{
          model: Comment,
          attributes: {
            exclude: ['post_id', 'id'],
          }
        }],
        where: {
          user_id: 1
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'post_id']
        }
        //association: "user_id",
        //attributes: ["username", "comment_text", "title", "post_text"]
      }
    ]
  });
  return res.json(results);
})
 

module.exports = router;