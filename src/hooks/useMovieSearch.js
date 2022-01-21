import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
	displayedMoviesState,
	searchStringState,
	selectedGenreState,
} from "../atoms/movieAtom";
import requests from "../requests";

function useMovieSearch(pageNumber) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [movies, setMovies] = useRecoilState(displayedMoviesState);
	const [hasMore, setHasMore] = useState(false);
	const [genre] = useRecoilState(selectedGenreState);
	const [query] = useRecoilState(searchStringState);

	useEffect(() => {
		setMovies([]);
	}, [query, genre]);

	console.log("pageNum", pageNumber);

	useEffect(() => {
		setLoading(true);
		setError(false);
		let cancel;

		if (query === "") {
			axios({
				method: "GET",
				url: requests.getPopular,
				params: { page: pageNumber },
				cancelToken: new axios.CancelToken((c) => (cancel = c)),
			})
				.then((res) => {
					setMovies((prevMovies) => {
						return [...new Set([...prevMovies, ...res.data.results])];
					});
					setHasMore(res.data.results.length > 0);
					setLoading(false);
				})
				.catch((e) => {
					if (axios.isCancel(e)) return;
					setError(true);
				});
			return cancel;
		}
	}, [pageNumber]);

	useEffect(() => {
		setLoading(true);
		setError(false);
		let cancel;

		if (query !== "") {
			axios({
				method: "GET",
				url: requests.getMovie,
				params: { query: query, page: pageNumber },
				cancelToken: new axios.CancelToken((c) => (cancel = c)),
			})
				.then((res) => {
					setMovies((prevMovies) => {
						return [
							...new Set([...prevMovies, ...res.data.results]),
						];
					});
					setHasMore(res.data.results.length > 0);
					setLoading(false);
				})
				.catch((e) => {
					if (axios.isCancel(e)) return;
					setError(true);
				});
			return () => cancel();
		}
	}, [query, pageNumber]);

	useEffect(() => {
		setLoading(true);
		setError(false);
		let cancel;

		if (genre) {
			axios({
				method: "GET",
				url: requests.getMovieByGenre,
				params: { with_genres: genre, page: pageNumber },
				cancelToken: new axios.CancelToken((c) => (cancel = c)),
			})
				.then((res) => {
					console.log(res);
					setMovies((prevMovies) => {
						return [...new Set([...prevMovies, ...res.data.results])];
					});
					setHasMore(res.data.results.length > 0);
					setLoading(false);
				})
				.catch((e) => {
					if (axios.isCancel(e)) return;
					setError(true);
				});
			return () => cancel();
		}

	}, [genre, pageNumber]);

	return { loading, error, movies, hasMore };
}

export default useMovieSearch;
