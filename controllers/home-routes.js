const express = require('express');
const router = require('express').Router();
const path = require('path');
const sequelize = require('../config/connections');
const { User, Library, Index } = require('../models/');

const Books = require('../models/Library');
const https = require('https');
const { response } = require('express');
const { title } = require('process');
const { callbackify } = require('util');

// add user response to url ${} testing parameters
//let url = `https://www.googleapis.com/books/v1/volumes?q=fiction+mystery`;
let bestSellers = "https://api.nytimes.com/svc/books/v3/lists/hardcover-fiction.json?api-key=tZFDyz4NLXMBFeRo9UhOkGW5lVUo7Lr6";
const options = new URL('https://www.googleapis.com/books/v1/volumes?q=fiction+myster');
// GET route for homepage
router.get('/', (req, res) => {
  res.render('homepage');
});

// GET route for book recommendations
router.get('/api/books/search', (req, res) => {
  //res.send('POST request received!')
 
    https.get(options, resp => {
      let data = '';
      resp.on('data', chunk => { 
          data += chunk;
      });
      // parse data
      resp.on('end', () => {
          res.json(JSON.parse(data))
          console.log(data);
      });
    })
    .on('error', (err) => {
      console.log('Error: ' + err.message);
    });
  });

// POST route to add book recs to database
router.post('/api/books/add', (req, res) => {

https.request(options, resp => {
      let data = '';
      resp.on('data', chunk => { 
          data += chunk;
      });
      // parse data
      resp.on('end', () => { // async
          res.json(JSON.parse(data))
          //getBooks(data);
         console.log(data);
      })
          .on('error', function () {
            console.log('Error :');
      })
/*
          const { items: [{volumeInfo}]} =  data;
          const [ categories ] = volumeInfo.categories;
          const [ authors ] = volumeInfo.authors;
      
          //const { volumeInfo: [categories] } = items;
         
          const newBooks = {
              title: volumeInfo.title,
              genre: categories,
              author: authors,
              //description: volumeInfo.description,
          }
          console.log(newBooks);
        
          Books.create({ //await
          title: newBooks.title,
          genre: newBooks.genre,
          author: newBooks.author,
          //description: newBooks.description
      })
      .then(function (data) {
          if (data) {
              response.send(data);
              console.log('Book added to your profile!');
      } else {
          response.status(400).send('Error in adding books!');   
        }     
      })
*/
    })
  })

// GET route for user's books ***THIS CODE WORKS***
router.get('/api/books', (req, res) => 
Books.findAll({
 
  raw: true,
  nest: true
})
.then((answers)=>{
    // destructure books
    const  books  = answers.map(({title, genre, author}) => ({Title: title, Author: author, Category: genre}));
    console.log(books);

    // render info in books handlebars
      res.render('partials/book-details',{
          books
          });
          req.on('error', ()=> {
          console.log('Error :' );
    })      
  })
);

// POST route for user to add a book 
router.post('/api/newbook', (req, res) => {
  const data = {
      title: 'Testing Here',
      genre: 'fiction',
      author: 'Testing Here',   
  }

  let { title, genre, author } = data;
  // insert into table
  Books.create({
      title, 
      genre,
      author,
      //description
  })
  .then(books => res.send('Book has been added to profile!'))
  .catch(err => {
      console.log(err);
  })
})

// GET route for bestsellers
router.get('/api/bestsellers', (req, res) => {
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
        // destructure object
        const { results: {books}} = answers;
        //console.log(books);

        // create a new array of bestselling books 
        const nyTimes = books.map(({rank, title, author, description}) => ({Rank: rank, Title: title, Author: author, Description: description}));
        console.log(nyTimes);
      });
  })

    // render info in books handlebars
    res.render('partials/bestsellers-details',{
      nyTimes
      });
      req.on('error', ()=> {
      console.log('Error :' );

  });
});

module.exports = router;