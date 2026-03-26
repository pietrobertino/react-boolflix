import AppHeader from "./components/AppHeader"
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";



function App() {

  const [movies, setMovies] = useState([]); //array di oggetti

  useEffect(() => { console.log(movies) }, [movies])

  function getStars(vote) {
    const stars = Math.ceil(Number(vote) / 2);
    const array = []
    for (let i = 0; i < 5; i++) {
      if (i < stars) {
        array.push("star-fill");
      } else { array.push("star"); }
    };
    console.log(array)
    return array
  }

  return (
    <>
      <AppHeader setMovies={setMovies} />
      <main>
        <ul>
          {movies?.map(movie => (
            <li key={movie.id}>
              <h3>{movie.title || movie.name}</h3>
              <h5>Original title: {movie.original_title || movie.original_name}</h5>
              <ReactCountryFlag countryCode={movie.original_language.toUpperCase() === "EN" ? "US" : movie.original_language.toUpperCase()} />
              <div>
                {getStars(movie.vote_average).map((star, index) => (
                  <i key={index} className={`bi bi-${star}`}></i>
                ))}
              </div>
              <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt={`${movie.title || movie.name}'s poster`} />
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default App
