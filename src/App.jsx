import AppHeader from "./components/AppHeader"
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";

function App() {

  const [movies, setMovies] = useState([]); //array di oggetti

  useEffect(() => { console.log(movies) }, [movies])

  return (
    <>
      <AppHeader setMovies={setMovies} />
      <main>
        <ul>
          {movies?.map(movie => (
            <li key={movie.id}>
              <h3>{movie.title || movie.name}</h3>
              <h5>Original title: {movie.original_title || movie.original_name}</h5>
              <ReactCountryFlag countryCode={movie.original_language.toUpperCase()} />
              <div>{movie.vote_average}</div>
              <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt="" />
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default App
