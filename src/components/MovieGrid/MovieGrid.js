import { useEffect, useState } from "react";
import requests from "../../requests";
import axios from "../../axios";
import Poster from "../Poster/Poster";
import { displayedMoviesState, loadingState } from "../../atoms/movieAtom";
import "./MovieGrid.css";
import { useRecoilState } from "recoil";
import ClipLoader from "react-spinners/ClipLoader";

function MovieGrid() {
	const [movies, setMovies] = useRecoilState(displayedMoviesState);
	const [isLoading, setIsloading] = useRecoilState(loadingState);

	console.log(isLoading);

	useEffect(() => {
		setIsloading(false);
	}, [setMovies]);

	return isLoading ? (
		<ClipLoader />
	) : (
		movies && (
			<div className="movie-grid">
				{movies?.map((movie) => (
					<Poster key={movie.id} movie={movie} />
				))}
			</div>
		)
	);
}

export default MovieGrid;
