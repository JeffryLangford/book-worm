const showBooks = (newBooks) =>
  fetch('/api/bestsellers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBooks),
    
  });