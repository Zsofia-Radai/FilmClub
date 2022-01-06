const API_KEY = "fb5d4cfa32b7892d5edfc3c7d7a15454";

const requests = {
	searchMovie: `/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=`,
    getPopular: `/movie/popular?api_key=${API_KEY}&language=en-US`
};

export default requests;
