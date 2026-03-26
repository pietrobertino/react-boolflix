import AppHeader from "./components/AppHeader"
import { useState } from "react";

function App() {

  const [results, setResults] = useState([]);

  return (
    <>
      <AppHeader setResults={setResults} />
      <main>
        <ul>
          {results.map(movie => (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <h4>{movie.original_title}</h4>
              <div>{movie.original_language}</div>
              <div>{movie.vote_average}</div>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default App
