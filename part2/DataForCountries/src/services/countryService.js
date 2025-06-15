import axios from 'axios';
const baseURL = 'https://studies.cs.helsinki.fi/restcountries/'
// {countryName} comes after

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then(response => response.data);
}

const getCountry = (countryName) => {
  const request = axios.get(`${baseURL}${countryName}`);
  return request.then(response => response.data);
}


export default {
  getAll,
  getCountry
};