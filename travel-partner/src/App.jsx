import './App.css'

import FlightSearch from './Pages/Flightsearch/FlightSearch';

function App() {

  async function handleClick(){
    console.log("Button Clicked");
    const response = await fetch("http://localhost:8080/home");
    const data = await response.json();
    console.log("Api Called");
    console.log(response);
    console.log(data);
  }

  return (
    <>
      <button onClick={handleClick}> Click Here </button>
      <FlightSearch />
    </>
  )
}

export default App
