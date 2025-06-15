import axios from 'axios';

const API_URL = 'https://studies.cs.helsinki.fi/restcountries/api/all';

const getAllCountries = () => {
  const request = axios.get(API_URL);
  return request.then(response => response.data);
}

const getCountryByName = (name) => {  
  const request = axios.get(`${API_URL}/${name}`);
  return request.then(response => response.data);
}


export default 
{
  getAllCountries,
  getCountryByName
};