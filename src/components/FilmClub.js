import "./FilmClub.css";
import banner from "../resources/banner.jpg";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";

function FilmClub() {
	return (
		<div className="page-container">
			<img className="banner" src={banner} alt="filmclub banner" />
			<Navbar />
			<Outlet />
		</div>
	);
}

export default FilmClub;
