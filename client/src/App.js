import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Form from "./Form";
import Secret from "./Secret";
const url = "https://hidden-scrubland-18020.herokuapp.com/api/v1/secret/";
function App() {
  const [secrets, setSecrets] = useState([]);
  const [hash, setHash] = useState([]);
  const [submitted, setSubmitted] = useState(0);
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        axios
          .get(url)
          .then(function (response) {
            // handle success
            setSecrets(response.data.data);
            console.log(response);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [submitted]);

  const onSubmit = (e, formData) => {
    e.preventDefault();
    try {
      axios
        .post(url, formData)
        .then(function (response) {
          // handle success
          console.log(response);
          setSearchResult(null);
          setSubmitted(submitted + 1);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onSearchChange = (e) => {
    setHash(e.target.value);
  };

  const onSearch = (e) => {
    e.preventDefault();
    try {
      axios
        .get(`${url}/${hash}`)
        .then(function (response) {
          // handle success
          console.log(response);
          setSearchResult(response.data);
        })
        .catch(function (error) {
          // handle error
          setSearchResult({});
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="">
        <h1>Welcome to secret server</h1>
        <Form onSubmit={onSubmit} />
      </div>
      <div className="pt-3">
        <h3>Find Secret By Hash</h3>
        <div>
          <form onSubmit={onSearch}>
            <div className="mb-3">
              <label htmlFor="hash" className="form-label">
                Hash
              </label>
              <input
                type="text"
                className="form-control"
                id="hash"
                name="hash"
                value={hash}
                onChange={onSearchChange}
              />
            </div>
            <button type="submit" className="btn btn-secondary">
              Search
            </button>
          </form>
        </div>
      </div>
      {secrets.length > 0 && !searchResult && (
        <div className="container secret-container">
          <h3 className="pt-3">Secrets list</h3>
          {secrets &&
            secrets.map((secret, id) => (
              <div className="row secret-row" key={id}>
                <Secret secret={secret} />
              </div>
            ))}
        </div>
      )}
      {searchResult && searchResult.hash && (
        <div className="container secret-container">
          <Secret secret={searchResult} />
        </div>
      )}
      {searchResult && !searchResult.hash && (
        <div className="container secret-container">Secret was not found</div>
      )}
    </div>
  );
}

export default App;
