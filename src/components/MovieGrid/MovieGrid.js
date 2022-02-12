import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import Poster from "../Poster/Poster";
import "./MovieGrid.css";

function MovieGrid() {
	const movies = useSelector((state) => state.movies);
	const loading = useSelector((state) => state.loading);

	let posters = (
		<div className="movie-grid">
			{movies?.map((movie) => (
				<Poster key={movie.id} movie={movie} />
			))}
		</div>
	);

	return loading ? (
		<ClipLoader />
	) : movies.length > 0 ? (
		<div>{posters}</div>
	) : (
		<div className="no-results">No results</div>
	);
}

export default MovieGrid;
