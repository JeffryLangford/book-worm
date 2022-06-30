
const bestSellers = document.querySelectorAll('.bestsellers');
const bookSearch = document.getElementById('book-search');
const searchInput = document.querySelector('.input');
/*
// function to add a bestseller book to user's library
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
        // take user to their library of books?
        document.location.replace('/api/books/library');
    } else {
       alert(response.statusText);
        }
    })
});

// function to add a book rec to user's library 
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

       window.location.replace('/api/books/recs');

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
*/

searchInput.addEventListener("keyup", async (e) => {
    // inside, we will need to achieve a few things:
    // 1. declare and assign the value of the event's target to a variable AKA whatever is typed in the search bar
    let value = e.target.value

    // 2. check: if input exists and if input is larger than 0
    //if (value && value.trim().length > 0){
        // 3. redefine 'value' to exclude white space and change input to all lowercase
         let category = value.trim().toLowerCase()
         console.log(category);

         

        // 4. return the results only if the value of the search is included in the person's name
        // we need to write code (a function for filtering through our data to include the search input value)
    //} else {
        // 5. return nothing
        // input is invalid -- show an error message or show no results
   const response = await fetch('/api/books/recs', {
        method: 'POST',
        body: JSON.stringify({
            category 
        }),
        headers: {
            'Content-Type': 'application/json',
        },
       
    })
    window.location.replace('/api/books/recs');
//}

})


//const clearButton = document.getElementById('clear')

//clearButton.addEventListener("click", () => {
    // 1. write a function that removes any previous results from the page
//});

