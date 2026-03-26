import { useState } from "react";
import axios from "axios";

export default function AppHeader({ setMovies }) {

    const [title, setTitle] = useState("");

    const api_key = import.meta.env.VITE_API_KEY;

    function handleSubmit(e) {
        e.preventDefault();
        setMovies([]);
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
        <header className="bg-black">
            <div className="container-fluid">
                <div className="d-flex align-items-center justify-content-between p-3">
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


