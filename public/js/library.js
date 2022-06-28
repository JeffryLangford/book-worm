const searchRecs = document.querySelector('.search-bar');
const searchInput = document.getElementById("searchInput");

const bestSellers = document.querySelectorAll('.bestsellers');

bestSellers.forEach(button => {
    button.addEventListener('click', function(event) {
        const button = event.currentTarget

        const button_title = button.dataset.title; 
        const button_author = button.dataset.author;
        //const button_genre = button.dataset.genre;
       console.log('BUTTON WORKS');
       console.log(button_title);
       console.log(button_author);

       const response = fetch('/api/books/bestsellers', {
        method: 'POST',
        body: JSON.stringify({
            title: button_title,
            author: button_author,
            //genre: button_genre   
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (Response.ok) {
        // take user to their library of books
        document.location.replace('/api/books/library');
    //} else {
       // alert(response.statusText);
        }
    })
});


const bookRecs = document.querySelectorAll('.bookRecs');

bookRecs.forEach(button => {
    button.addEventListener('click', async function(event) {
        const button = event.currentTarget

       const button_title = button.dataset.title; 
       const button_author = button.dataset.author;
       const button_genre = button.dataset.genre;
       console.log('BUTTON WORKS');
       console.log(button_title);
       console.log(button_author);
       console.log(button_genre);

       const response = await fetch('/api/books/recs', {
        method: 'POST',
        body: JSON.stringify({
            title: button_title,
            author: button_author,
            genre: button_genre   
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
})
})