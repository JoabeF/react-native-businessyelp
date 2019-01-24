import axios from 'axios';

const apiKey = "a9F25OTkL*********************SD";

const api = axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    timeout: 40000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + apiKey
    }
});

export default api;
