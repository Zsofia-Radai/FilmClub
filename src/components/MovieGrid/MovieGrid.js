import { useEffect, useState } from "react";
import requests from "../../requests";
import axios from "../../axios";
import Poster from "../Poster/Poster";
import { displayedMoviesState } from "../../atoms/movieAtom";
import "./MovieGrid.css";
import { useRecoilState } from "recoil";

function MovieGrid() {
	const [movies, setMovies] = useRecoilState(displayedMoviesState);

	useEffect(() => {
		async function fetchPopular() {
			const request = await axios.get(requests.getPopular);
            console.log(request);
			setMovies(request.data.results);
			return request;
		}
		fetchPopular();
	}, []);

	return (
        <div className="movie-grid">
            {movies?.map(movie => (
                <Poster key={movie.id} movie={movie} />
            ))}
        </div>
    );
}

export default MovieGrid;
