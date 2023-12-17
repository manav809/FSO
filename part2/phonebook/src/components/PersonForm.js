import phonenumberService from "../services/phonenumbers";
const PersonForm = ({
  setNewName,
  setPersons,
  setPhoneNumber,
  newName,
  phoneNumber,
  persons,
  setAddedAlert,
  setAlertColor,
}) => {
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: phoneNumber,
    };
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        if (
          window.confirm(
            `${newName} is already added to phonebook...Do you want to update?`
          )
        ) {
          const person = persons.find((person) => person.name === newName);
          phonenumberService
            .update(person.id, newPerson)
            .then((newPerson) => {
              setPersons(
                persons.map((p) => (p.id !== person.id ? p : newPerson))
              );
              setAddedAlert(`Updated ${person.name}`);
              setAlertColor("added");
              setTimeout(() => {
                setAddedAlert(null);
              }, 5000);
            })
            .catch(() => {
              setAddedAlert(`${newName} was deleted`);
              setAlertColor("deleted");
              setTimeout(() => {
                setAddedAlert(null);
              }, 5000);
            });
          return;
        } else {
          return;
        }
      }
      if (i === persons.length - 1 && persons[i].name !== newName) {
        console.log("helo");
        phonenumberService.create(newPerson).then((person) => {
          setPersons(persons.concat(person));
          setAddedAlert(`Added ${person.name}`);
          setAlertColor("added");
          setTimeout(() => {
            setAddedAlert(null);
          }, 5000);
        });
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
