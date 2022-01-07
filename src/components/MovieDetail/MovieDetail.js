import requests from "../../requests";
import axios from "../../axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { selectedMovie } from "../../atoms/movieAtom";
import NAPoster from "../../resources/no_poster.png";
import "./MovieDetail.css";


const poster_base_url = "https://image.tmdb.org/t/p/original/";

function MovieDetail() {
    const [movieId, setMovieId] = useRecoilState(selectedMovie);
    const [movieDetails, setMovieDetails] = useState();

    useEffect(() => {
        async function getMovieDetails() {
            if (!movieId) return;
            const request = await axios.get(`movie/${movieId}?api_key=fb5d4cfa32b7892d5edfc3c7d7a15454&language=en-US`);
            console.log(request.data);
            setMovieDetails(request.data);
			return request;
        }
        getMovieDetails();
    }, [movieId])

    return (
        <div>
            <img
				className="movie-detail-poster"
				src={movieDetails?.poster_path ? `${poster_base_url}${movieDetails.poster_path}` : NAPoster}
				alt="poster"
			/>
        </div>
    )
}

export default MovieDetail;
