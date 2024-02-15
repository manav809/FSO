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

    if (persons.length === 0) {
      phonenumberService.create(newPerson).then(() => {
        setPersons(persons.concat(newPerson));
        setAddedAlert(`Added ${newPerson.name}`);
        setAlertColor("added");
        setTimeout(() => {
          setAddedAlert(null);
        }, 5000);
      });
      return;
    }
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        if (
          window.confirm(
            `${newName} is already added to phonebook...Do you want to update?`
          )
        ) {
          const person = persons.find((person) => person.name === newName);
          phonenumberService
            .update(newPerson)
            .then(() => {
              const people = persons.map((p) =>
                p.name !== person.name ? p : newPerson
              );
              console.log(people);
              setPersons(people);
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
      if (
        (i === persons.length - 1 && persons[i].name !== newName) ||
        persons.length === 0
      ) {
        phonenumberService
          .create(newPerson)
          .then(() => {
            setPersons(persons.concat(newPerson));
            setAddedAlert(`Added ${newPerson.name}`);
            setAlertColor("added");
            setTimeout(() => {
              setAddedAlert(null);
            }, 5000);
          })
          .catch((error) => {
            setAddedAlert(`${error.response.data.error}`);
            setAlertColor("deleted");
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
