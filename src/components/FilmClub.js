import "./FilmClub.css";
import banner from "../resources/banner.jpg";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPopular } from "../store/moviesActions"

function FilmClub() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPopular());
	}, [dispatch]);

	return (
		<div className="page-container">
			<img className="banner" src={banner} alt="filmclub banner" />
			<Navbar />
			<Outlet />
		</div>
	);
}

export default FilmClub;
