const key = {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        Authorization: 'p5HEBHFjloEmQRYuqoSZVR2u73nOevbW'
  }
};

const nyTimesApiCall = () => {
    let apiSelection = `https://api.nytimes.com/svc/books/v3/lists/full-overview.json`

    fetch(apiSelection).then(response => {
        if (response.ok) {
            response.json().then(data => {
                displayTopBook(data);
            });
        } else {
            alert("Error: Link not found");
        }
    }).catch(err => console.error(err));
}

//const displayTopBook = () => {
