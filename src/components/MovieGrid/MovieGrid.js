import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import useMovieSearch from "../../hooks/useMovieSearch";
import { moviesActions } from "../../store/moviesSlice";
import MovieDetail from "../MovieDetail/MovieDetail";
import Poster from "../Poster/Poster";
import "./MovieGrid.css";

function MovieGrid() {
	const movies = useSelector((state) => state.movies);
	const loading = useSelector((state) => state.loading);
	const pageNumber = useSelector((state) => state.pageNumber);
	const [showMovieDetails, setshowMovieDetails] = useState(false);
	const dispatch = useDispatch();
	const observer = useRef();

	const { hasMore, isLoading, error } = useMovieSearch(pageNumber);

	const lastMovieElementRef = useCallback(
		(node) => {
			if (isLoading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					dispatch(moviesActions.setPageNumber(pageNumber + 1));
				}
			});
			if (node) observer.current.observe(node);
		},
		[isLoading, hasMore, dispatch, pageNumber]
	);

	function handlePosterClicked(movieId) {
		dispatch(moviesActions.setSelectedMovieId(movieId));
		setshowMovieDetails(true);
	}

	function handleMovieDetailsClosed() {
		setshowMovieDetails(false);
	}

	let posters = (
		<div className="movie-grid">
			{movies?.map((movie, index) => {
				if (movies.length === index + 1) {
					return (
						<div key={movie.id} ref={lastMovieElementRef}>
							<Poster
								movie={movie}
								posterClicked={() => handlePosterClicked(movie.id)}
							/>
						</div>
					);
				} else {
					return (
						<Poster
							key={movie.id}
							movie={movie}
							posterClicked={() => handlePosterClicked(movie.id)}
						/>
					);
				}
			})}
		</div>
	);

	let displayedMessage = () => {
		if (error) {
			let errorMessage = `Error occured: ${error}`;
			return <div className="error">{errorMessage}</div>;
		}
		return <div className="no-results">No results</div>;
	};

	return loading ? (
		<ClipLoader />
	) : movies.length > 0 ? (
		<div>
			{!showMovieDetails ? (
				posters
			) : (
				<MovieDetail close={handleMovieDetailsClosed} />
			)}
		</div>
	) : (
		displayedMessage()
	);
}

export default MovieGrid;
