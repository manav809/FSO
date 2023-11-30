const Filter = ({ setSearch, setSearchedPersons, persons }) => {
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    const searchinput = event.target.value;
    const searched = [];
    persons.forEach((person) => {
      if (person.name.includes(searchinput)) {
        searched.push(person);
      }
    });
    setSearchedPersons(searched);
  };
  return (
    <>
      filter shown with <input onChange={handleSearchChange} />
    </>
  );
};

export default Filter;
