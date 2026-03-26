import { useState } from "react";
import axios from "axios";

export default function AppHeader({ setMovies }) {

    const [title, setTitle] = useState("");

    const api_key = import.meta.env.VITE_API_KEY;

    function handleSubmit(e) {
        e.preventDefault();
        const query = title.toLowerCase().replace(" ", "+");
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`)
            .then(res => {
                setMovies(prevMovies => [...prevMovies, ...res.data.results]);//array di oggetti o array vuoto se no risultati
            })
        axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${query}`)
            .then(res => {
                setMovies(prevMovies => [...prevMovies, ...res.data.results]);
            })
        setTitle("");
    }

    return (
        <header>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    placeholder="Search movie..."
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required />
                <button>Search</button>
            </form>
        </header>
    )
}


// adesso aggiugniamo anche le serie tv, chiamat api: https://api.themoviedb.org/3/search/tv?api_key=&query=
// come fare per fare due chiamate diverse senza sapere a prescindere se si tratta di una serie o di un film?