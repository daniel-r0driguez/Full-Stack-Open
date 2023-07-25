import axios from 'axios';

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api';

const getAll = async () => {
    const request = axios.get(`${baseURL}/all`);
    return request.then(response => response.data);
}

const getCountry =  async (countryName) => {
    const request = axios.get(`${baseURL}/name/${countryName}`);
    return request.then(response => response.data);
}

export default {getAll, getCountry};