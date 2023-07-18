
import { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  // Set the states.
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');

  const [newNumber, setNewNumber] = useState('');

  const [filter, setFilter] = useState('');

  // Hook to fetch data from json server.
  const hook = () => {
    console.log('effect');
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('Data: ', response.data);
      setPersons(response.data);
    });
  };

  useEffect(hook, []);

  /**
   * Checks to see if a name is already in the persons array.
   * @param {string} _newName the potential new name to add to the array.
   * @returns true if the name is already added, false otherwise
   */
  const checkIfAdded = (_newName) => {
    const added = persons.find((person) => {
      return person.name === _newName;
    });

    // If an index is found, then that means it has already been added to the array. Return true.
    if (added !== undefined)
    {
      alert(`${_newName} is already added to phonebook`);
      return true;
    }
    return false;
  }

  // Event Handlers
  const addPerson = (event) => {
    event.preventDefault();

    // Check if the name is already in the array
    // or if the name is empty.
    if (checkIfAdded(newName) || newName.length === 0)
    {
      // If so, do not add it. Simply return.
      return;
    }
    
    // If it is a valid new name, create a new person object and update the states.
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };
    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  return (
  <div>
    <h2>Phonebook</h2>

    <Filter filter={filter} handleFilterChange={handleFilterChange}/>

    <h3>Add a new contact</h3>

    <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>

    <h3>Numbers</h3>
    
    <Persons persons={persons} filter={filter}/>
  </div>
  );
};

export default App;