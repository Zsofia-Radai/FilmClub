import axios from "../axios";
import requests from "../requests";
import { moviesActions } from "./moviesSlice";

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
