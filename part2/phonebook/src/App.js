import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: 1232123212 }]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value)
  } 
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const person = { name: newName, number: phoneNumber };
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        alert(`${newName} is already added to phonebook`);
      }
      if (i === persons.length - 1 && persons[i].name != newName) {
        setPersons(persons.concat(person));
      }
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          phone number: <input value={phoneNumber} onChange={handlePhoneNumberChange} />
        </div>
        <div>
          <button type="submit" disabled={newName != "" && phoneNumber != "" ? false : true}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => {
          return <li key={person.name}>{person.name} {person.number}</li>;
        })}
      </ul>
    </div>
  );
};

export default App;
