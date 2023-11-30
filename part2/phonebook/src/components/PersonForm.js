const PersonForm = ({ setNewName, setPersons, setPhoneNumber, newName, phoneNumber, persons }) => {
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
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
    <>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
          phone number: <input onChange={handlePhoneNumberChange} />
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
    </>
  );
};

export default PersonForm;
