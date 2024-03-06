import axios from "axios";

const options = {
    method: 'GET',
    url: 'https://faviconfinder.p.rapidapi.com/faviconurl/',
    params: {
      url: 'https://www.google.com',
      fallback: 'https://www.iana.org/_img/bookmark_icon.ico'
    },
    headers: {
      'X-RapidAPI-Key': '7451944aa6msh80d005f1a085da5p1749dfjsne93cb40597aa',
      'X-RapidAPI-Host': 'faviconfinder.p.rapidapi.com'
    }
  };
  
  try {
      const response = await axios.request(options);
      console.log(response.data);
  } catch (error) {
      console.error(error);
  }