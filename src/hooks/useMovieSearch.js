import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import requests from "../requests";
import { moviesActions } from "../store/moviesSlice";

function useMovieSearch(pageNumber) {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState();
	const [hasMore, setHasMore] = useState(false);
	const dispatch = useDispatch();

	const movies = useSelector((state) => state.movies);
	const selectedGenre = useSelector((state) => state.selectedGenre);
	const query = useSelector((state) => state.query);

	const getUrl = () => {
		if (selectedGenre) {
			return `${requests.getMovieByGenre}${selectedGenre}`;
		}
		if (query) {
			return `${requests.getMovie}${query}`;
		}
		return requests.getPopular;
	};

	useEffect(() => {
		setIsLoading(true);
		setError(null);
		let cancel;

		axios({
			method: "GET",
			url: getUrl(),
			params: { page: pageNumber },
			cancelToken: new axios.CancelToken((c) => (cancel = c)),
		})
			.then((res) => {
				dispatch(
					moviesActions.setMovies([
						...new Set([...movies, ...res.data.results]),
					])
				);
				setHasMore(res.data.results.length > 0);
				dispatch(moviesActions.setLoading(false));
				setIsLoading(false);
			})
			.catch((error) => {
				if (axios.isCancel(error)) return;
				setError(error.message);
				dispatch(moviesActions.setLoading(false));
				setIsLoading(false);
			});
		return cancel;
	}, [pageNumber, selectedGenre, query, dispatch]);

	return { isLoading, error, movies, hasMore };
}

export default useMovieSearch;
