import axios from "../axios";
import requests from "../requests";
import { moviesActions } from "./moviesSlice";

export const fetchPopular = () => {
	return async (dispatch) => {
		dispatch(moviesActions.setLoading(true));
		dispatch(moviesActions.setSelectedGenre(null));
		const fetchMovies = async () => {
			const response = await axios.get(requests.getPopular);
			const movies = await response.data.results;
			return movies;
		};
		try {
			const movies = await fetchMovies();
			dispatch(moviesActions.setMovies(movies));
			dispatch(moviesActions.setLoading(false));
		} catch (error) {
			console.log(error.message);
			console.log("display error noti");
		}
	};
};

export const fetchByGenre = (genre) => {
	return async (dispatch) => {
		dispatch(moviesActions.setLoading(true));
		const fetchMovies = async () => {
			const response = await axios.get(
				`${requests.getMovieByGenre}${genre}`
			);
			const movies = await response.data.results;
			return movies;
		};
		try {
			const movies = await fetchMovies();
			dispatch(moviesActions.setMovies(movies));
			dispatch(moviesActions.setLoading(false));
		} catch (error) {
			console.log(error.message);
			console.log("display error noti");
		}
	};
};

export const fetchByQuery = (query) => {
	return async (dispatch) => {
		dispatch(moviesActions.setLoading(true));
		dispatch(moviesActions.setSelectedGenre(null));
		const fetchMovies = async () => {
			const response = await axios.get(`${requests.getMovie}${query}`);
			const movies = await response.data.results;
			return movies;
		};
		try {
			const movies = await fetchMovies();
			dispatch(moviesActions.setMovies(movies));
			dispatch(moviesActions.setLoading(false));
		} catch (error) {
			console.log(error.message);
			console.log("display error noti");
		}
	};
};

export const fetchGenres = () => {
	return async (dispatch) => {
		dispatch(moviesActions.setLoading(true));
		const fetchData = async () => {
			const response = await axios.get(requests.getGenres);
			const genres = await response.data.genres;
			return genres;
		};
		try {
			const genres = await fetchData();
			dispatch(moviesActions.getGenres(genres));
			dispatch(moviesActions.setLoading(false));
		} catch (error) {
			console.log(error.message);
			console.log("display error noti");
		}
	};
};
