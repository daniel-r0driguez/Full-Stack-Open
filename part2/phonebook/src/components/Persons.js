const Persons = ({persons, filter}) => {
    const personsToShow = (filter === '') ? persons : persons.filter(person => person.name.search(new RegExp(filter, "i")) !== -1);
    console.log("Filter:", filter);
    console.log(personsToShow);

    return (
        <div>
            {personsToShow.map(person =>
            <p key={person.id}>{person.name}: {person.number}</p>)}
        </div>
    );
};

export default Persons;