import { useCallback, useEffect, useRef } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useRecoilState } from "recoil";
import {
	displayedMoviesState,
	pageLoadedState,
	pageNumberState,
} from "../../atoms/movieAtom";
import useMovieSearch from "../../hooks/useMovieSearch";
import Poster from "../Poster/Poster";
import "./MovieGrid.css";

function MovieGrid() {
	const [movies] = useRecoilState(displayedMoviesState);
	const [isLoaded, setIsloaded] = useRecoilState(pageLoadedState);
	const [pageNumber, setPageNumber] = useRecoilState(pageNumberState);

	useEffect(() => {
		setIsloaded(true);
	}, [setIsloaded]);

	const observer = useRef();

	const { hasMore, loading, error } = useMovieSearch(pageNumber);

	const lastMovieElementRef = useCallback(
		(node) => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPageNumber((prevPageNumber) => prevPageNumber + 1);
				}
			});
			if (node) observer.current.observe(node);
		},
		[loading, hasMore]
	);

	let posters = (
		<div className="movie-grid">
			{movies?.map((movie, index) => {
				if (movies.length === index + 1) {
					return (
						<div key={movie.id} ref={lastMovieElementRef}>
							<Poster movie={movie} />
						</div>
					);
				} else {
					return <Poster key={movie.id} movie={movie} />;
				}
			})}
		</div>
	);

	return (
		<>
			<div>{posters}</div>
			<div>{loading && <ClipLoader />}</div>
			<div>{error && "Error"}</div>
			{movies.length === 0 && !loading && (
				<div className="no-results">No results</div>
			)}
		</>
	);
}

export default MovieGrid;
