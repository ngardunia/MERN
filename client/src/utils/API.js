// route to get logged in user's info (needs the token)
export const getLoggedInUser = (token) => {  
  return fetch('/api/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

// make a search to google books api
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};

// https://www.googleapis.com/books/v1/volumes?q=harry+potter
