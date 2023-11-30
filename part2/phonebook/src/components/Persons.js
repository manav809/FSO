const Persons = ({searchedPersons, persons,search}) => {
  return (
    <>
      <ul>
        {search
          ? searchedPersons.map((person) => {
              return (
                <li key={person.name}>
                  {person.name} {person.number}
                </li>
              );
            })
          : persons.map((person) => {
              return (
                <li key={person.name}>
                  {person.name} {person.number}
                </li>
              );
            })}
      </ul>
    </>
  );
};

export default Persons;
