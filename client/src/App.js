import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
const url = "https://hidden-scrubland-18020.herokuapp.com/api/v1/secret/";
function App() {
  const [secrets, setSecrets] = useState([]);
  const [formData, setFormData] = useState({
    secret: "",
    expireAfter: "",
  });
  const [submitted, setSubmitted] = useState(0);
  const { secret, expireAfter } = formData;
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

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post(url, formData)
        .then(function (response) {
          // handle success
          console.log(response);
          setSubmitted(submitted + 1);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="container">
      <div className="">
        <h1>Welcome to secret server</h1>
        <div className="form">
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="secretText" className="form-label">
                Secret text
              </label>
              <input
                type="text"
                className="form-control"
                id="secretText"
                name="secret"
                value={secret}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="expiresAfter" className="form-label">
                Expires After
              </label>
              <input
                type="number"
                className="form-control"
                id="expiresAfter"
                name="expireAfter"
                value={expireAfter}
                onChange={onChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
      {secrets.length > 0 && (
        <div className="container secret-container">
          <h3 className="pt-3">Secrets list</h3>
          {secrets.map((secret, id) => (
            <div className="row secret-row" key={id}>
              <div><b>Hash:</b> {secret.hash}</div>
              <div><b>Secret:</b> {secret.secretText}</div>
              <div><b>Created at:</b> {secret.createdAt}</div>
              <div>
                <b>Expires at:</b>{" "}
                {secret.expiresAt === null ? "Never" : secret.expiresAt}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
