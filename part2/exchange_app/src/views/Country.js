import { useState, useEffect } from "react";
import axios from "axios";

const Country = () => {
  const [value, setValue] = useState("");
  const [countriesNames, setCountriesNames] = useState([]);
  const [matched, setMatched] = useState(null);
  const [prediction, setPrediction] = useState([]);

  const [matchedCountry, setMatchedCountry] = useState({});
  const styles = {
    country: {
      float: "left",
    },
  };

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountriesNames(
          response.data.map((country) => {
            return country.name.common;
          })
        );
      });
  }, []);

  useEffect(() => {
    matched
      ? axios
          .get(
            `https://studies.cs.helsinki.fi/restcountries/api/name/${matched}`
          )
          .then((response) => {
            setMatchedCountry(response.data);
          })
          .catch((err) => console.log(err))
      : setMatchedCountry({});
  }, [matched]);

  const handleChange = (event) => {
    setValue(event.target.value);
    let names = countriesNames
      .map((name) => {
        if (name.includes(event.target.value)) {
          return name;
        } else {
          return null;
        }
      })
      .filter(Boolean);

    event.target.value !== "" ? setPrediction(names) : setPrediction([]);

    names.length === 1 ? setMatched(names[0]) : setMatched(null);
  };
  const handleShowMore = (country) => {
    setMatched(country);
  };
  return (
    <div style={styles.country}>
      <h1>Country Wiki</h1>
      Find Country: <input value={value} onChange={handleChange} />
      {prediction.length < 10 && Object.keys(matchedCountry).length === 0 ? (
        prediction.map((country, i) => (
          <p key={i}>
            {country}{" "}
            <button onClick={() => handleShowMore(country)}>show more</button>
          </p>
        ))
      ) : Object.keys(matchedCountry).length > 0 ? (
        <div>
          <h1>{matchedCountry.name.common}</h1>
          <p>Capital: {matchedCountry.capital[0]}</p>
          <p>Area Code: {matchedCountry.area}</p>
          <h3>Languages: </h3>
          {Object.values(matchedCountry.languages).map((language, i) => (
            <li key={i}>{language}</li>
          ))}
          <h3>Currency: </h3>
          {Object.keys(matchedCountry.currencies).map((currency) => (
            <p>{currency}</p>
          ))}
          <h3>Flag</h3>
          <img src={matchedCountry.flags["png"]} alt="flag" />
        </div>
      ) : (
        <p>Too many matches... please be specific</p>
      )}
    </div>
  );
};

export default Country;
