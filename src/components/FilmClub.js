import "./FilmClub.css";
import banner from "../resources/banner.jpg";
import Navbar from "./Navbar/Navbar";

function FilmClub() {
	return (
		<div className="page-container">
			<img className="banner" src={banner} alt="filmclub banner" />
			<Navbar />
			{/* movies */}
		</div>
	);
}

export default FilmClub;
