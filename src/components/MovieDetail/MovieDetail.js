import { RewindIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "../../axios";
import NAPoster from "../../resources/no_poster.png";
import "./MovieDetail.css";

const poster_base_url = "https://image.tmdb.org/t/p/original/";
const API_KEY = "fb5d4cfa32b7892d5edfc3c7d7a15454";

function MovieDetail() {
	const movieId = useSelector((state) => state.selectedMovieId);
	const [movieDetails, setMovieDetails] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [credits, setCredits] = useState();

	//TODO: outsource this function (put it in the store)
	useEffect(() => {
		async function getMovieDetails() {
			if (!movieId) return;
			const movieDetailsRequest = await axios.get(
				`movie/${movieId}?api_key=${API_KEY}&language=en-US`
			);
			const creditsRequest = await axios.get(
				`/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
			);
			setMovieDetails(movieDetailsRequest.data);
			setCredits(creditsRequest.data);
			setIsLoading(false);
			return movieDetailsRequest;
		}
		getMovieDetails();
	}, [movieId]);

	return isLoading ? (
		<div className="loader">
			<ClipLoader />
		</div>
	) : (
		<>
			<div className="movie-details-container">
				<img
					className="movie-detail-poster"
					src={
						movieDetails?.poster_path
							? `${poster_base_url}${movieDetails.poster_path}`
							: NAPoster
					}
					alt="poster"
				/>

				{movieDetails && (
					<div className="movie-details">
						<h2>{movieDetails.original_title}</h2>
						<div>
							{movieDetails.runtime} min |{" "}
							{movieDetails.genres
								.map((genre) => genre.name)
								.join(", ")}{" "}
							| {movieDetails.release_date} |{" "}
							{movieDetails.original_language.toUpperCase()}
						</div>
						<div>
							Cast:{" "}
							{credits.cast
								.slice(0, 5)
								.map((actor) => actor.name)
								.join(", ")}
						</div>
						<div>{movieDetails.overview}</div>
					</div>
				)}
			</div>
			<RewindIcon className="back-icon" onClick={() => window.history.back()} />
		</>
	);
}

export default MovieDetail;
