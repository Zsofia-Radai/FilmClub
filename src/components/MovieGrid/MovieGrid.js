import { useEffect, useState } from "react";
import requests from "../../requests";
import axios from "../../axios";
import Poster from "../Poster/Poster";
import { displayedMoviesState, loadedState } from "../../atoms/movieAtom";
import "./MovieGrid.css";
import { useRecoilState } from "recoil";
import ClipLoader from "react-spinners/ClipLoader";

function MovieGrid() {
	const [movies, setMovies] = useRecoilState(displayedMoviesState);
	const [isLoaded, setIsloaded] = useRecoilState(loadedState);

	useEffect(() => {
		setIsloaded(true);
	}, [setMovies]);

	return isLoaded ? (
		movies && (
			<div className="movie-grid">
				{movies?.map((movie) => (
					<Poster key={movie.id} movie={movie} />
				))}
			</div>
		)
	) : <ClipLoader />
}

export default MovieGrid;
