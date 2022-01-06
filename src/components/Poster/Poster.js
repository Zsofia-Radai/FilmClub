import "./Poster.css";
import ReactTooltip from "react-tooltip";

const poster_base_url = "https://image.tmdb.org/t/p/original/";

function Poster({ movie }) {
	return (
		<>
			<img
				data-tip
				data-for={`poster-tooltip-${movie.id}`}
				className="movie-thumbnail"
				src={`${poster_base_url}${movie.poster_path}`}
				alt="poster"
			/>

			<ReactTooltip
				id={`poster-tooltip-${movie.id}`}
				place="bottom"
				type="dark"
				effect="float"
			>
				{movie.title}
			</ReactTooltip>
		</>
	);
}

export default Poster;
