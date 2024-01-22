import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import ReactTooltip from "react-tooltip";
import star from "../../resources/gold_star.png";
import NAPoster from "../../resources/no_poster.png";
import { moviesActions } from "../../store/moviesSlice";
import "./Poster.css";

const poster_base_url = "https://image.tmdb.org/t/p/original/";

function Poster({ movie, posterClicked }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	console.log(posterClicked);
	const tooltip = (
		<>
			{movie.title} ({movie.release_date?.substring(0, 4)}) <br />
			{movie.vote_average} <img className="star" src={star} alt="" />
		</>
	);

	function handlePosterClick() {
		dispatch(moviesActions.setSelectedMovieId(movie.id));
		setTimeout(() => navigate(`/movies/${movie.id}`), 100);
	}

	return (
		<>
			<img
				data-tip
				data-for={`poster-tooltip-${movie.id}`}
				className="movie-thumbnail"
				src={movie.poster_path ? `${poster_base_url}${movie.poster_path}` : NAPoster}
				alt="poster"
				onClick={() => handlePosterClick()}
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
