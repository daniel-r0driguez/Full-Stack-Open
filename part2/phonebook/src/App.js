
import { useState } from 'react';

const App = () => {
  // Set the states.
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas'}
  ]);

  const [newName, setNewName] = useState('');

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

  const addPerson = (event) => {
    event.preventDefault();

    // Check if the name is already in the array.
    if (checkIfAdded(newName))
    {
      // If so, do not add it. Simply return.
      return;
    }
    
    // If it is a new name, create a new person object and update the states.
    const newPerson = {
      name: newName
    };
    setPersons(persons.concat(newPerson));
    console.log(persons);
    setNewName('');
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  }

  return (
  <div>
    <h2>Phonebook</h2>
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handlePersonChange}/>
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
    <h2>Numbers</h2>
    <div>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  </div>
  )
}

export default App;