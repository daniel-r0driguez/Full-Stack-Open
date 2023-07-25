import { useState, useEffect } from 'react';
import countryService from './services/countries';

import SearchBar from './components/SearchBar';
import Countries from './components/Countries';

const App = () => {
  
  const [countries, setCountries] = useState([]);
  const [searchEntry, setSearchEntry] = useState('');

  // Hook to get initial list of all countries.
  const hook = () => {
    countryService.getAll()
    .then(_countries => {
      setCountries(_countries);
    })
    .catch(error => {
      console.log('Error in hook():', error);
    });
  }

  // Updates the search entry whenever it is changed.
  const handleSearchChange = (event) => {
    setSearchEntry(event.target.value);
  }

  useEffect(hook, []);

  return (
    <div>
      <SearchBar searchEntry={searchEntry} handleSearchChange={handleSearchChange}/>
      <Countries countries={countries} searchEntry={searchEntry}/>
    </div>
  );
}

export default App;