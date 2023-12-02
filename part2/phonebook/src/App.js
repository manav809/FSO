import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchedPersons, setSearchedPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        setSearch={setSearch}
        setSearchedPersons={setSearchedPersons}
        persons={persons}
      />
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
