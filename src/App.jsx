import AppHeader from "./components/AppHeader"
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";

function App() {

  const [results, setResults] = useState([]);

  useEffect(() => {
    console.log(results)
  }, [results])

  return (
    <>
      <AppHeader setResults={setResults} />
      <main>
        <ul>
          {results.map(movie => (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <h5>Original title: {movie.original_title}</h5>
              <ReactCountryFlag countryCode={movie.original_language.toUpperCase()} />
              <div>{movie.vote_average}</div>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default App
