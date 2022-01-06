import "./FilmClub.css";
import banner from "../resources/banner.jpg";
import Navbar from "./Navbar/Navbar";
import MovieGrid from "./MovieGrid/MovieGrid";

function FilmClub() {
	return (
		<div className="page-container">
			<img className="banner" src={banner} alt="filmclub banner" />
			<Navbar />
			<MovieGrid />
		</div>
	);
}

export default FilmClub;
