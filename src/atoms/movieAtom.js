import { atom, selector } from "recoil";
import requests from "../requests";
import axios from "../axios";

const popular = selector({
	key: "popular",
	get: async ({ get }) => {
		const request = await axios.get(requests.getPopular);
		return request.data.results;
	},
});

const genres = selector({
	key: "genres",
	get: async ({ get }) => {
		const request = await axios.get(requests.getGenres);
		return request.data.genres;
	},
});

export const displayedMoviesState = atom({
	key: "displayedMoviesState",
	default: popular,
});

export const selectedMovie = atom({
	key: "selectedMovie",
	default: null,
});

export const loadedState = atom({
	key: "loadedState",
	default: false,
});

export const genresState = atom({
    key: "genresState",
    default: genres
});
