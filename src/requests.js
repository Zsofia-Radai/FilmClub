const API_KEY = "fb5d4cfa32b7892d5edfc3c7d7a15454";

const requests = {
	getMovie: `/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=`,
    getPopular: `/movie/popular?api_key=${API_KEY}&language=en-US`,
    getGenres: `/genre/movie/list?api_key=${API_KEY}&language=en-US`,
    getMovieByGenre: `/discover/movie?api_key=${API_KEY}&language=en-US&page=1&with_genres=`
};

export default requests;
