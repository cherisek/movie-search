import React, { useState } from "react";
import axios from 'axios';
// import logo from './logo.svg';
import Search from "./components/Search";
import Results from "./components/Results";
import Popup from "./components/Popup";
import './App.css';

function App() {
  const [state, setState] = useState({
    s: "", 
    results: [],
    selected: {}
  })
  const apiurl = "https://www.omdbapi.com/?apikey=dfe6d885"; 

  const search = (e) => {
    if (e.key === "Enter") {
      axios(apiurl + "&s=" + state.s).then(({ data }) => {
        let results = data.Search; 

        setState(prevState => {
          return { ...prevState, results: results }
        })
      });
    }
  }

  const handleInput = (e) => {
    let s = e.target.value; 

    setState(prevState => {
      return { ...prevState, s: s }
    }); 
  } 

  const openPopup = id => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data; 

      console.log(result);

      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
  } 

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }

  return (
    <div className="App">
      <header>
        <div className="header-container">
          <h1>Movie Search</h1>
          <Search handleInput={handleInput} search={search} />
        </div>
      </header>
      <main>
        <Results results={state.results} openPopup={openPopup} />
        {(typeof state.selected.Title != "undefined") ? 
        <Popup selected={state.selected} closePopup={closePopup} /> : false}
      </main>
    </div>
  );
}

export default App;
