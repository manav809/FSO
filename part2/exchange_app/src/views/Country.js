import { useState, useEffect } from "react";
import axios from "axios";

const Country = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [matched, setMatched] = useState();
  const styles = {
    country: {
      float: "left",
    },
  };

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountries(response.data);
        console.log(response.data);
      });
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div style={styles.country}>
      <h1>Country Wiki</h1>
      Find Country: <input value={value} onChange={handleChange} />
    </div>
  );
};

export default Country;
