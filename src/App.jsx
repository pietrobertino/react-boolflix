import AppHeader from "./components/AppHeader"
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";



function App() {

  const [movies, setMovies] = useState([]); //array di oggetti

  function getStars(vote) {
    const stars = Math.ceil(Number(vote) / 2);
    const array = []
    for (let i = 0; i < 5; i++) {
      if (i < stars) {
        array.push("star-fill");
      } else { array.push("star"); }
    };
    return array
  }

  return (
    <>
      <AppHeader setMovies={setMovies} />
      <main className="bg-dark">
        <div className="container">
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 py-3 g-3">
            {movies?.map(movie => (
              <div className="col h-100" key={movie.id}>
                <div className="card h-100 bg-black text-white">
                  <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt={`${movie.title || movie.name}'s poster`} className="card-img h-100" />
                  <div className="card-img-overlay">
                    <h3>{movie.title || movie.name}</h3>
                    <h5>Original title: {movie.original_title || movie.original_name}</h5>
                    <ReactCountryFlag countryCode={movie.original_language.toUpperCase() === "EN" ? "US" : movie.original_language.toUpperCase()} />
                    <div>
                      {getStars(movie.vote_average).map((star, index) => (
                        <i key={index} className={`bi bi-${star}`}></i>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default App


//Appunti:
//capire come gestire meglio le bandiere: molte non funzionano perché sono associate al codice del paese non della lingua (es il giapponese invece di essere jp è ja), quindi devo trovare un workaround o un altro metodo per mostrarle che utilizzi la lingua
// alcune card restano più corte di altre, inoltre per i titoli senza poster la card è minuscola, devo gestire la cosa