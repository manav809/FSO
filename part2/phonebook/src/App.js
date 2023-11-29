import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [searchedPersons, setSearchedPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [search, setSearch] = useState("");

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const person = {
      name: newName,
      number: phoneNumber,
      id: persons.length + 1,
    };
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        alert(`${newName} is already added to phonebook`);
      }
      if (i === persons.length - 1 && persons[i].name !== newName) {
        setPersons(persons.concat(person));
      }
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={search} onChange={handleSearchChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          phone number:{" "}
          <input value={phoneNumber} onChange={handlePhoneNumberChange} />
        </div>
        <div>
          <button
            type="submit"
            disabled={newName !== "" && phoneNumber !== "" ? false : true}
          >
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
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
    </div>
  );
};

export default App;
