import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
	movies: [], 
	genres: [], 
	selectedMovieId: null,
	selectedGenre: null,
	loading: true
 };

const moviesSlice = createSlice({
	name: "movies",
	initialState,
	reducers: {
		setMovies(state, action) {
			state.movies = action.payload;
		},
		getGenres(state, action) {
			state.genres = action.payload;
		},
		setSelectedMovieId(state, action) {
			state.selectedMovieId = action.payload;
		},
 		setSelectedGenre(state, action) {
			state.selectedGenre = action.payload;
		},
		setLoading(state, action) {
			state.loading = action.payload;
		}
	},
});

export const moviesActions = moviesSlice.actions;

export default moviesSlice.reducer;
