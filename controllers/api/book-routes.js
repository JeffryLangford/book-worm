const express = require('express');
const router = require('express').Router();
const path = require('path');
const sequelize = require('../../config/connections');
//const { User, Library, Index } = require('../models/');

const Books = require('../../models/Library');
const https = require('https');

// add user's parameters to url** // testing parameters 
let url = `https://www.googleapis.com/books/v1/volumes?q=fiction+mystery`;
let bestSellers = "https://api.nytimes.com/svc/books/v3/lists/hardcover-fiction.json?api-key=tZFDyz4NLXMBFeRo9UhOkGW5lVUo7Lr6";

// GET route for homepage
router.get('/', (req, res) => {
  res.render('homepage');
});

// GET route for book recommendations ***THIS CODE WORKS***
router.get('/api/books/search', (req, res) => {
  //res.send('POST request received!')
 
    https.get(url, resp => {
      let data = '';
      resp.on('data', chunk => { 
          data += chunk;
      });
      // parse data
      resp.on('end', () => {
        const answers = JSON.parse(data);
          //console.log(answers);

        // destructure and create new array
        const { items } = answers;
        //console.log(items);
        const searchBooks = items.map(({volumeInfo: {title, authors, description, categories, imageLinks: {thumbnail}}}
          ) => ({Title: title, Author: [authors], Description: description, Category: [categories], Picture: thumbnail}));
       //console.log(searchBooks);

      // render info in library partials handlebars
      res.render('partials/book-details',{
      searchBooks
      })
      req.on('error', ()=> {
        console.log('Error :' );
      })
    })
  })
});

// POST route to add book recs to database *****************************
router.post('/api/books/add', (req, res) => {

https.request(url, resp => {
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
          req.on('error', function () {
            //console.log('Error :');
      })
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
  //})

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

    // render info in books partials handlebars
      res.render('partials/library-details',{
          books
          });
          req.on('error', ()=> {
          console.log('Error :' );
    })      
  })
);

// POST route for user to add a book ***THIS CODE WORKS***
    // add functionality for user to input data into form and add to database
router.post('/api/books/new', (req, res) => {
  // dummy data to add a book
  const data = {
      title: 'Testing Title',
      genre: 'fiction',
      author: 'Testing Author',   
  }

  let { title, genre, author } = data;
  // insert into table
  Books.create({
      title, 
      genre,
      author
      //description
  })
  .then(() => res.send('Book has been added to profile!'))
  //res.render('partials/book-details',{
    //send user back to library page?
    //})
  .catch(err => {
      console.log(err);
  })
});

// GET route for bestsellers *** THIS CODE WORKS ***
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
        const nyTimes = books.map(({rank, title, author, description, book_image}) => ({Rank: rank, Title: title, Author: author, Description: description, Picture: book_image}));
        console.log(nyTimes);
  
    // render info in bestsellers partials handlebars
    res.render('partials/bestsellers-details',{
      nyTimes
      });
      req.on('error', ()=> {
      console.log('Error :' );
      });
    })
  });
});

module.exports = router;