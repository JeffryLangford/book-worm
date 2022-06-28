const addBook = document.getElementById("add-book");

const bookLikes = (book) => {
    console.log('HELLO BUTTON WORKS')
    fetch('api/books/likes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
    })

}

addBook.addEventListener("click", bookLikes);