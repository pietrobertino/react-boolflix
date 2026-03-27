import { useState } from "react";
import axios from "axios";

export default function AppHeader({ setMovies, movies }) {

    const [title, setTitle] = useState("");

    const api_key = import.meta.env.VITE_API_KEY;

    function handleSubmit(e) {
        e.preventDefault();
        setMovies([]);
        const query = title.toLowerCase().replace(" ", "+");
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`)
            .then(async (res) => {
                let results = res.data.results;

                const promises = results.map(async (result, i) => { //funzione per modificare results in modo che ogni oggetto abbia anche una chiave per la lista degli attori
                    try {
                        const response = await axios.get(`https://api.themoviedb.org/3/movie/${result.id}/credits?api_key=${api_key}`);

                        const actors = []; // array di stringhe con i nomi degli attori
                        const cast = response.data.cast.filter(member => member.known_for_department === "Acting") // array di oggetti contente i singoli attori (e solo gli attori)

                        //ordino gli attori per popolarità
                        cast.sort((a, b) => (b.popularity - a.popularity))


                        for (let k = 0; k < cast.length; k++) {
                            actors.push(cast[k].original_name);
                        }
                        results[i] = { ...results[i], actor_names: actors } //adesso results[i] contiene l'oggetto originale più la chiave-valore actor_names: array di nomi
                    }
                    catch (err) {
                        console.error(err);
                    }
                })

                await Promise.all(promises); // aspetto che tutte le chiamate siano finite

                setMovies(prevMovies => [...prevMovies, ...results]);//array di oggetti 

            })
        axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${query}`)
            .then(async (res) => {
                let results = res.data.results;

                const promises = results.map(async (result, i) => { //funzione per modificare results in modo che ogni oggetto abbia anche una chiave per la lista degli attori
                    try {
                        const response = await axios.get(`https://api.themoviedb.org/3/tv/${result.id}/credits?api_key=${api_key}`);

                        const actors = []; // array di stringhe con i nomi degli attori
                        const cast = response.data.cast.filter(member => member.known_for_department === "Acting") // array di oggetti contente i singoli attori (e solo gli attori)

                        //ordino gli attori per popolarità
                        cast.sort((a, b) => (b.popularity - a.popularity))


                        for (let k = 0; k < cast.length; k++) {
                            actors.push(cast[k].original_name);
                        }
                        results[i] = { ...results[i], actor_names: actors } //adesso results[i] contiene l'oggetto originale più la chiave-valore actor_names: array di nomi
                    }
                    catch (err) {
                        console.error(err);
                    }
                })

                await Promise.all(promises); // aspetto che tutte le chiamate siano finite

                setMovies(prevMovies => [...prevMovies, ...results]);//array di oggetti 

            })

        setTitle("");
    }

    return (
        <header className="bg-black">
            <div className="container-fluid">
                <div className="d-flex align-items-center justify-content-between gap-3 p-3">
                    <h1 className="text-danger" id="logo">
                        BOOLFLIX
                    </h1>
                    <form onSubmit={handleSubmit} className="d-flex align-items-center gap-3 pb-3">
                        <input
                            className="form-control bg-dark text-white"
                            type="text"
                            placeholder="Search anything..."
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required />
                        <button className="btn btn-danger">Search</button>
                    </form>
                </div>
            </div>
        </header>
    )
}


//la chiamata per sapere gli attori di un film di fa così https://api.themoviedb.org/3/movie/{movie_id}/credits, il movie id ci viene fornito dall'oggetto che otteniamo dalla prima chiamata,
//poi se mi sposto sulla chaive "cast" ottengo un array di oggetti, il cui ogni oggetto è un attore, noi prendiamo i primi 5, e alla chiave original_name ottengo nome e cognome dell'attore sottoforma di stringa. 

//per quanto riguarda le serie la chiamata è la seguente https://api.themoviedb.org/3/tv/{series_id}/credits, poi il rsto è tutto uguale al film. 

// il problema è come faccio a fare in modo che siano nella stessa scheda? come gestisco le chiamate api?

//la cosa migliore sarebbe aggiungere all'oggetto del film o della serie una nuova chiave valore, e poi semplicemente accedervi come per le altre. come si aggiunge chiave valore ad un oggetto? con il metodo di spread

