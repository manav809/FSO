import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

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

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter
          setSearch={setSearch}
          setSearchedPersons={setSearchedPersons}
          persons={persons}
        />
      </div>
      <h2>add a new</h2>
      <PersonForm
        setNewName={setNewName}
        setPhoneNumber={setPhoneNumber}
        newName={newName}
        phoneNumber={phoneNumber}
        setPersons={setPersons}
        persons={persons}
      />
      <h2>Numbers</h2>
      <Persons
        search={search}
        searchedPersons={searchedPersons}
        persons={persons}
      />
    </div>
  );
};

export default App;
