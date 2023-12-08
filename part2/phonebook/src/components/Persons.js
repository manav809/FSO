import phonenumberService from "../services/phonenumbers";

const Persons = ({ searchedPersons, persons, search, setPersons }) => {
  const handleDelete = (person) => {
    if(window.confirm(`Delete ${person.name}`)){
      phonenumberService.deleteEntry(person.id);
      setPersons(persons.filter((p) => p.id !== person.id));      
    }
  };
  return (
    <>
      <ul>
        {search
          ? searchedPersons.map((person) => {
              return (
                <li key={person.name}>
                  {person.name} {person.number}{" "}
                  <button onClick={() => handleDelete(person)}>delete</button>
                </li>
              );
            })
          : persons.map((person) => {
              return (
                <li key={person.name}>
                  {person.name} {person.number}{" "}
                  <button onClick={() => handleDelete(person)}>delete</button>
                </li>
              );
            })}
      </ul>
    </>
  );
};

export default Persons;
