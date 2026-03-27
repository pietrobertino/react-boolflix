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

                const promises = results.map(async (result, i) => {
                    try {
                        //funzione per modificare results in modo che ogni oggetto abbia anche una chiave per la lista degli attori
                        const castResponse = await axios.get(`https://api.themoviedb.org/3/movie/${result.id}/credits?api_key=${api_key}`);

                        const actors = []; // array di stringhe con i nomi degli attori
                        const cast = castResponse.data.cast.filter(member => member.known_for_department === "Acting") // array di oggetti contente i singoli attori (e solo gli attori)

                        //ordino gli attori per popolarità
                        cast.sort((a, b) => (b.popularity - a.popularity))


                        for (let k = 0; k < cast.length; k++) {
                            actors.push(cast[k].original_name);
                        }


                        //funzione che modifica nuovamente results per aggiungere chiave-valore genres:lista di generi
                        const genresResponse = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`);


                        const allGenres = genresResponse.data.genres; //array di oggetti con ogni genere
                        const myIds = result.genre_ids; // array con i nostri id

                        const genres = allGenres.filter(genre => {
                            return myIds.includes(genre.id) //includiamo il genere solo se il suo id è contenuto nella nostra lista
                        })

                        //trasformo la lista di oggetti genre in una lista di stringhe
                        genres.forEach((item, index) => genres[index] = item.name);




                        //aggiorno i risultati con la nuove chiavi valore (sia per gli attori che per i generi)
                        results[i] = { ...results[i], actor_names: actors, genres: genres };

                    }
                    catch (err) {
                        console.error(err);
                    }
                })

                await Promise.all(promises); // aspetto che tutte le chiamate siano finite

                setMovies(prevMovies => [...prevMovies, ...results]);//si aggiorna l'array di oggeti movies

            })
        axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${query}`)
            .then(async (res) => {
                let results = res.data.results;

                const promises = results.map(async (result, i) => {
                    try {
                        //funzione per modificare results in modo che ogni oggetto abbia anche una chiave per la lista degli attori
                        const castResponse = await axios.get(`https://api.themoviedb.org/3/tv/${result.id}/credits?api_key=${api_key}`);

                        const actors = []; // array di stringhe con i nomi degli attori
                        const cast = castResponse.data.cast.filter(member => member.known_for_department === "Acting") // array di oggetti contente i singoli attori (e solo gli attori)

                        //ordino gli attori per popolarità
                        cast.sort((a, b) => (b.popularity - a.popularity))


                        for (let k = 0; k < cast.length; k++) {
                            actors.push(cast[k].original_name);
                        }


                        //funzione che modifica nuovamente results per aggiungere chiave-valore genres:lista di generi
                        const genresResponse = await axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${api_key}`);


                        const allGenres = genresResponse.data.genres; //array di oggetti con ogni genere
                        const myIds = result.genre_ids; // array con i nostri id

                        const genres = allGenres.filter(genre => {
                            return myIds.includes(genre.id) //includiamo il genere solo se il suo id è contenuto nella nostra lista
                        })

                        //trasformo la lista di oggetti genre in una lista di stringhe
                        genres.forEach((item, index) => genres[index] = item.name);




                        //aggiorno i risultati con la nuove chiavi valore (sia per gli attori che per i generi)
                        results[i] = { ...results[i], actor_names: actors, genres: genres };

                    }
                    catch (err) {
                        console.error(err);
                    }
                })

                await Promise.all(promises); // aspetto che tutte le chiamate siano finite

                setMovies(prevMovies => [...prevMovies, ...results]);//si aggiorna l'array di oggeti movies

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


//Appunti:

//devo chiamare anche i generi, ogni  oggetto associato a un film /serie (movie) ha una chiave genre_ids: che contiene un array di id associati all'opera. 

//1 prendo questi id, p2 oi faccio la chiamata alla lista di id (che diversa per serie e film ovviamente), 3 filtro la lista che ottengo dall'api usando quella che prendo dal movie

//4 infine aggiungo una nuova chiave all'oggetto movie, ovvero gernes: lista di stringhe e 5 la stampo

//chiamte: https://api.themoviedb.org/3/genre/tv/list   https://api.themoviedb.org/3/genre/movie/list
