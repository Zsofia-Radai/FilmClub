import "./Poster.css";
import ReactTooltip from "react-tooltip";
import star from "../../resources/gold_star.png";
import NAPoster from "../../resources/no_poster.png";
import { useNavigate } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { selectedMovie } from "../../atoms/movieAtom";
import { useEffect } from "react";

const poster_base_url = "https://image.tmdb.org/t/p/original/";

function Poster({ movie }) {
	const navigate = useNavigate();
	const [selectedMovieId, setSelectedMovieId] = useRecoilState(selectedMovie);

	const tooltip = (
		<>
			{movie.title} ({movie.release_date?.substring(0, 4)}) <br />
			{movie.vote_average} <img className="star" src={star} alt="" />
		</>
	);

	function handlePosterClick() {
		setSelectedMovieId(movie.id);
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
