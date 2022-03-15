import { Outlet } from "react-router-dom";
import banner from "../resources/banner.jpg";
import "./FilmClub.css";
import Navbar from "./Navbar/Navbar";
import ScrollUpButton from "./ScrollButton/ScrollUpButton";
import { useRef } from "react";

function FilmClub() {
	const moviesContainerRef = useRef();

	return (
		<div className="page-container">
			<div ref={moviesContainerRef} className="movies-container">
				<img className="banner" src={banner} alt="filmclub banner" />
				<Navbar />
				<Outlet />
			</div>
			<ScrollUpButton elementRef={moviesContainerRef} />
		</div>
	);
}

export default FilmClub;
