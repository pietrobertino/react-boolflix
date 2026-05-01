import { useEffect, useState } from "react";
import axios from "axios";

export default function AppHeader({ setMovies, setSelectedGenreId }) {

    const [genreList, setGenreList] = useState([]);
    const [title, setTitle] = useState("");

    const api_key = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        const genreSet = new Set();
        async () => {
            const promise_1 = axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${api_key}`)
                .then(res => res.data.genres.forEach(genre => genreSet.add(genre)))
            const promise_2 = axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`)
                .then(res => res.data.genres.forEach(genre => genreSet.add(genre)))
            await Promise.all(promise_1, promise_2)
            setGenreList([...genreSet]);
        }

    }, []);

    useEffect(() => { console.log(genreList) }, [genreList])

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
                    <select
                        name="genres"
                        id="genres"
                        onChange={(e) => setSelectedGenreId(e.target.value)}>
                        <option value="">All movies and TV</option>
                        {genreList.map(genre => (
                            <option value={genre.id} key={genre.id}>{genre.name}</option>
                        ))}

                    </select>
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




//Milestone 6: 
/*
0) ottengo la lista di generi dall'api

1) creo un select con tot opzioni quante ce ne sono nella lista di generi (in relatà due selcect, uno per le serie e uno per i film)

2) all'onselected o quello che è aggiorno una variabile reattiva che conterrà gli id (uno pe rle seire uno per i film) associati al genere

3) 




*/