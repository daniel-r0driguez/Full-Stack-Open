import { useState, useEffect } from 'react';
import personService from './services/persons';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  // Set the states.
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');

  const [newNumber, setNewNumber] = useState('');

  const [filter, setFilter] = useState('');

  const [message, setMessage] = useState(null);

  const [success, setSuccess] = useState(true);


  // Hook to fetch data from json server.
  const hook = () => {
    console.log('effect');
    personService
    .getAll()
    .then( initialPersons => {
      console.log('Data: ', initialPersons);
      setPersons(initialPersons);
    })
    .catch(error => {
      setNotification('An error occured. Cannot display list of contacts.', false);
    });
  };

  useEffect(hook, []);


  // Helper functions.
  /**
   * Checks to see if a name is already in the persons array.
   * @param {string} _newName the potential new name to add to the array.
   * @returns a person object if found, undefined if not found.
   */
  const checkIfAdded = (_newName) => {
    const added = persons.find((person) => {
      return person.name === _newName;
    });

    // If an index is found, then that means it has already been added to the array. Return true.
    return added;
  }

  /**
   * Sets the message and success of the notification state.
   * @param {string} _message the message to display.
   * @param {boolean} _success whether the notification is a successful one or not.
   */
  const setNotification = (_message, _success) => {
    setMessage(_message);
    setSuccess(_success);

    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  // Event Handlers
  const addPerson = (event) => {
    event.preventDefault();
    
    const checkPerson = checkIfAdded(newName);

    // Check if the name is already in the array.
    if (checkPerson !== undefined)
    {
      const changeNumber = window.confirm(`${checkPerson.name} is already added to phonebook, replace the old number with a new one?`).valueOf();

      // If the user wants to update the number...
      if (changeNumber)
      {
        // Create a shallow copy of the original person object in the array.
        // Update its number to the new number.
        const copyCheckPerson = {...checkPerson, number: newNumber};
        
        // Make a HTTP PUT request to update the person.
        personService
        .update(copyCheckPerson.id, copyCheckPerson)
        .then(returnedPerson => {
          setPersons(persons.map(_person => {
            if (_person.id === returnedPerson.id)
            {
              return copyCheckPerson;
            }
            return _person;
          }));

          setNotification(`Updated ${copyCheckPerson.name}.`, true);
        })
        .catch(error => {
          setNotification(`${copyCheckPerson.name} does not exist in server.`, false);

          setPersons(persons.filter(_person => (_person.id !== copyCheckPerson.id)));
        });

        setNewName('');
        setNewNumber('');
      }
      return;
    }
    
    // Create a new person to be added to the server.
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    
    // Make an HTTP POST request to save the new person to the server.
    personService
    .create(newPerson)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');

      setNotification(`Added ${returnedPerson.name}.`, true);
    })
    .catch(error => {
      setNotification(`An error occured. Cannot add ${newPerson.name}.`, false);
    });
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

  const handleDelete = (person) => {
    const remove = window.confirm(`Delete "${person.name}"?`).valueOf();

    if (remove)
    {
      personService
      .remove(person)
      .then(response => {
        setNotification(`Deleted ${person.name}.`, true);
      })
      .catch(error => {
        setNotification(`${person.name} was already removed from the server.`, false);
      });

      setPersons(persons.filter(_person => (_person.id !== person.id)));
    }
  }

  return (
  <div>
    <h2>Phonebook</h2>

    <Notification message={message} success={success}/>

    <Filter filter={filter} handleFilterChange={handleFilterChange}/>

    <h3>Add a new contact</h3>

    <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>

    <h3>Numbers</h3>
    
    <Persons persons={persons} filter={filter} handleDelete={handleDelete}/>
  </div>
  );
};

export default App;