import { useState } from "react";
import axios from "axios";

export default function AppHeader({ setResults }) {

    const [title, setTitle] = useState("");

    const api_key = import.meta.env.VITE_API_KEY;

    function handleSubmit(e) {
        e.preventDefault();
        //prendiamo title, lo rendiamo idoneo alla query e poi effettuiamo la chiamata api (lo avrei fatto con uno useeffect se non fosse stato che deve effettuare la ricerca solo al click del pulsante)
        const query = title.toLowerCase().replace(" ", "+");
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`)
            .then(res => {
                setResults(res.data.results);
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


//al click del bottone (submit) chiamiamo l'api e fetchiamo i dati dei film

//come costruire la chiamata API? https://api.themoviedb.org/3/search/movie?api_key=&query=
