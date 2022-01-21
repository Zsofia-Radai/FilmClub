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
	default: [],
});

export const selectedMovie = atom({
	key: "selectedMovie",
	default: null,
});

export const searchStringState = atom({
	key: "searchStringState",
	default: ""
})

export const pageNumberState = atom({
	key: "pageNumberState",
	default: 1
})

export const pageLoadedState = atom({
	key: "pageLoadedState",
	default: false,
});

export const genresState = atom({
    key: "genresState",
    default: genres
});

export const selectedGenreState = atom({
	key: "selectedGenreState",
	default: null
})
