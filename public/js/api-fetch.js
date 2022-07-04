const key = {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        Authorization: 'p5HEBHFjloEmQRYuqoSZVR2u73nOevbW'
  }
};

let searchbar = document.getElementById('searchBook');

const nyTimesApiCall = (choice) => {
    let apiSelection = `https://api.nytimes.com/svc/books/v3/lists/full-overview.json?published_date=${choice}&api-key=smvg8ZcHWTc23U5oSLSWIH1yCkOWvhP9`

    fetch(apiSelection, key).then(response => {
        if (response.ok) {
            response.json().then(data => {
                displayTopBook(data);
            });
        } else {
            alert("Error: Link not found");
        }
    }).catch(err => console.error(err));
}

$('#bookSearch').submit(function(event){

    // get the textbox value
    var bookText = $(`#bookSearch`).val();
    // takes the text to put in the search
    nyTimesApiCall(`${bookText}`);
    event.preventDefault();
    console.log(nyTimesApiCall);
});

//const displayTopBook = () => {
