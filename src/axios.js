import axios from "axios";

/** Base URI to make API requests */

const apiRequest = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
});

// Call using apiRequest.get('/foobar')

export default apiRequest;