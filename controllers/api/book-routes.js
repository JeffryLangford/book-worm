const express = require('express');
//const { request } = require('http');
const path = require('path');
const router = express.Router();
const db = require('/Users/vanessarodriguez/Desktop/group-projects/book-worm/config/connections.js');
const Books = require('/Users/vanessarodriguez/Desktop/group-projects/book-worm/models/Books.js');
const https = require('https')
const url = "https://www.googleapis.com/books/v1/volumes?q=fiction"
//const url = "https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=tZFDyz4NLXMBFeRo9UhOkGW5lVUo7Lr6";

router.get('/books', (req, res) => {
    res.send('GET request received!')
    https.get(url, res => {

    
    let data = '';
    res.on('data', chunk => {
        data += chunk;
    });
    res.on('end', () => {
        data = JSON.parse(data);

        const { items: [{volumeInfo}]} =  data;
        console.log(volumeInfo.title, volumeInfo.authors);
       
    }
    )}
)})


        
    





/*
router.get('/books', (req, res) => {
    //if (!req.params) {
        //res.status(500);
        //res.send({"Error": "No title"})
    //}
    
        // fetch api
        fetch( "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=tZFDyz4NLXMBFeRo9UhOkGW5lVUo7Lr6", {
           method: 'GET',
           headers: {
            'Content-Type': 'application/json',
           },
           body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
    });
    
*/


/* TESTING ROUTES TO ADD BOOKS TO DATABASE
// get ALL books
router.get('/books', (req, res) => 
Books.findAll()
    .then(books => {
        console.log(books)
        res.sendStatus(200);
    })
    .catch(err => console.log(err)));

// add a book 
router.get('/books/add', (req, res) => {
    const data = {
        title: 'Testing',
        genre: 'fiction',
        author: 'me',
        description: 'about me'
    }
    let { title, genre, author, description } = data;
    // insert into table
    Books.create({
        title, 
        genre,
        author,
        description
    })
    .then(books => res.redirect('/books'))
    .catch(err => {
        console.log(err);
    })
})
*/

module.exports = router;