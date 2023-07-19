import Person from './Person';

const Persons = ({persons, filter, handleDelete}) => {
    const personsToShow = (filter === '') ? persons : persons.filter(person => person.name.search(new RegExp(filter, "i")) !== -1);
    console.log("Filter:", filter);
    console.log(personsToShow);

    return (
        <div>
            {personsToShow.map(person =>
            <Person key={person.id} person={person} handleDelete={handleDelete}/>)}
        </div>
    );
};

export default Persons;