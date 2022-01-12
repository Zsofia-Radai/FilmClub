import { useEffect } from "react";
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
	}, [setMovies, setIsloaded]);

	return isLoaded ? (
		<div className="movie-grid">
			{movies?.map((movie) => (
				<Poster key={movie.id} movie={movie} />
			))}
		</div>
	) : (
		<ClipLoader />
	);
}

export default MovieGrid;
