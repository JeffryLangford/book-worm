const express = require('express');
const router = require('express').Router();
const path = require('path');
const sequelize = require('../../config/connection');
//const { User, Library, Index } = require('../models/');
const axios = require("axios");

const Books = require('../../models/library');
const https = require('https');
//const  { newValue } = require('../../public/js/library');
// add user's parameters to url** // testing parameters 
//let bestSellers = "https://api.nytimes.com/svc/books/v3/lists/hardcover-fiction.json?api-key=tZFDyz4NLXMBFeRo9UhOkGW5lVUo7Lr6";

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
    genre: req.body.genre
  })
    .then(answers => res.json(answers))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// GET route for user's books (api/books/library) ***THIS CODE WORKS*** 
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
// POST route for user to add a new book into database (api/books/new) ***THIS CODE WORKS***
    // add functionality for user to input data into form and add to database   
router.post('/new', (req, res) => {
  
  // insert into table
  Books.create({
       title: req.body.title,
       genre: req.body.genre,
       author: req.body.author, 
       user_id: req.body.user_id   
  })
  .then(answer => res.json(answer))
  
    //res.send('YOUR BOOK WAS ADDED!')
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

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

/*
// GET route for bestsellers (api/books/bestsellers) *** THIS CODE WORKS ***
  // add book to library functionality 
router.get('/bestsellers', (req, res) => {
  https.get(bestSellers, (resp) => {
    let data = '';
    resp.on('data', chunk => { 
        data += chunk;
    });
    // parse data
    resp.on('end', () => {
        //res.json(JSON.parse(data))

        // parse data
        const answers = JSON.parse(data);
        console.log(data);
        // destructure object
        const { results:{ list_name, books}} = answers;
        console.log(list_name);
        
        // create a new array of bestselling books 
        const nyTimes = books.map(({rank, title, author, description, book_image}) => ({Rank: rank, Title: title, Author: author, Description: description, Picture: book_image}));
        console.log(nyTimes);
        
  
    // render info in bestsellers partials handlebars
    res.render('partials/bestsellers-details',{
      nyTimes,
      list_name
      //genre
      });
      req.on('error', ()=> {
      console.log('Error :' );
      });
    })
  });
});
*/

// TESTING GET route using axios
router.get('/bestsellers', async (req, res) => {
  //const params = new URLSearchParams();
  //const category = JSON.stringify(req.body);  
    //params.append("q", `${category}`);
    //const url = "https://api.nytimes.com/svc/books/v3/lists/"
    //const params = new URLSearchParams();
    //const category = JSON.parse(JSON.stringify(req.body));  
    const category = JSON.stringify(req.params);
      //params.append(`${category}`);
      //const request = {
       // params: params
      //}; 
    //const request = JSON.stringify(req.body);
    
      try {
          const response = await axios.get("https://api.nytimes.com/svc/books/v3/lists/" + category + ".json?api-key=tZFDyz4NLXMBFeRo9UhOkGW5lVUo7Lr6")
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
    genre: req.body.genre
  })
    .then(answer => res.json(answer))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;