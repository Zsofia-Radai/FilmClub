import "./Poster.css";

const poster_base_url = "https://image.tmdb.org/t/p/original/";

function Poster({ movie }) {
	return (
		<img
			className="movie-thumbnail"
			src={`${poster_base_url}${movie.poster_path}`}
			alt="poster"
		/>
	);
}

export default Poster;
