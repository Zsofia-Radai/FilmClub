import "./Poster.css";
import ReactTooltip from "react-tooltip";
import star from "../../resources/gold_star.png";

const poster_base_url = "https://image.tmdb.org/t/p/original/";

function Poster({ movie }) {

	const tooltip = (
		<>
			{movie.title} ({movie.release_date.substring(0, 4)}) <br />
			{movie.vote_average} <img className="star" src={star} alt="" />
		</>
	);
	
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
				{tooltip}
			</ReactTooltip>
		</>
	);
}

export default Poster;
