import { Outlet } from "react-router-dom";
import banner from "../resources/banner.jpg";
import "./FilmClub.css";
import Navbar from "./Navbar/Navbar";

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
