import AppHeader from "./components/AppHeader"
import { useEffect, useState } from "react";
import LanguageFlag from "./components/LanguageFlag";


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

  useEffect(() => { console.log(movies) }, [movies])

  function getFlagCode(lanCode) {

    let finalCode;
    switch (lanCode) {
      case "en":
        finalCode = "us";
        break;
      case "ja":
        finalCode = "jp";
        break;
      case "ko":
        finalCode = "kr";
        break;
      case "zh":
        finalCode = "cn";
        break;
      default:
        finalCode = lanCode;
    }
    return finalCode;

  }

  function orderMovies(list) {
    list.sort((a, b) => Number(b.popularity) - Number(a.popularity));
    return list

  }




  return (
    <>
      <AppHeader setMovies={setMovies} movies={movies} />
      <main className="bg-dark">
        <div className="container">
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 py-3 g-3">
            {orderMovies(movies)?.map(movie => (
              <div className="col h-100" key={movie.id}>
                <div className="card h-100 bg-black text-white">
                  <div className="ratio">
                    <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt={`${movie.title || movie.name}'s poster`} className="card-img object-fit-cover " />
                  </div>
                  <div className="card-img-overlay">
                    <h3>{movie.title || movie.name}</h3>
                    <h5>Original title: {movie.original_title || movie.original_name}</h5>
                    <div>
                      <LanguageFlag flagCode={getFlagCode(movie.original_language)} />
                      <span className="ms-2">{movie.original_language.toUpperCase()}</span>
                    </div>
                    <div>
                      {getStars(movie.vote_average).map((star, index) => (
                        <i key={index} className={`bi bi-${star}`}></i>
                      ))}
                    </div>
                    <div>
                      Actors: {movie.actor_names.slice(0, 5).join(", ")}
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


//alla fine dovrei componentizzare un po di roba, come le card, la search bar, i filtri che poi aggiungerò ecc.
//inoltre potrei pensare di aggiungere layout, context api e roba varia giusto per, se mi avanza tempo.

//ricordarsi di stampare solo i primi 5 attori