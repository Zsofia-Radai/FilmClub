const API_KEY = "fb5d4cfa32b7892d5edfc3c7d7a15454";
const BASE_URL = "https://api.themoviedb.org/3";

const requests = {
	getMovie: `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=`,
    getPopular: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`,
    getGenres: `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`,
    getMovieByGenre: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=`,
};

export default requests;
