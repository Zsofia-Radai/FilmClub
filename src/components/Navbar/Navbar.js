import { LoginIcon, MenuIcon } from "@heroicons/react/outline";
import { SearchIcon, UserAddIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
	displayedMoviesState,
	genresState,
	pageLoadedState,
	pageNumberState,
	searchStringState,
	selectedGenreState,
} from "../../atoms/movieAtom";
import axios from "../../axios";
import useMovieSearch from "../../hooks/useMovieSearch";
import requests from "../../requests";
import "./Navbar.css";

function Navbar() {
	const [toggleMenu, setToggleMenu] = useState(false);
	const [toggleCategories, setToggleCategories] = useState(false);
	const [searchString, setSearchString] = useState("");
	const [movies, setMovies] = useRecoilState(displayedMoviesState);
	const [isLoaded, setIsloaded] = useRecoilState(pageLoadedState);
	const genres = useRecoilState(genresState);
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const [selectedGenre, setSelectedGenre] =
		useRecoilState(selectedGenreState);
	const [pageNumber, setPageNumber] = useRecoilState(pageNumberState);
	const [query, setQuery] = useRecoilState(searchStringState);
	const navigate = useNavigate();

	useEffect(() => {
		const changeWidth = () => {
			setScreenWidth(window.innerWidth);
		};

		window.addEventListener("resize", changeWidth);
		return () => {
			window.removeEventListener("resize", changeWidth);
		};
	}, []);

	const toggleNav = () => {
		setToggleMenu(!toggleMenu);
	};

	const handleCategoriesClick = () => {
		setToggleCategories(!toggleCategories);
	};

	function goHome() {
		setQuery("");
		setPageNumber(1);
		navigate("/");
	}

	function searchMovie(event) {
		if (event.key === "Enter") {
			setQuery(event.target.value);
			setSearchString("");
			setPageNumber(1);
		}
	}

	function searchMovieByGenre(genre) {
		setSelectedGenre(genre.id);
		navigate(`/search/${genre.name.toLowerCase()}`);
		setPageNumber(1);	
	}

	const selectedGenreStyle = (genre) =>
		selectedGenre === genre.id ? "genre-selected" : "";

	const categoriesSubmenu = (
		<>
			<hr className="submenu-separator" />
			<div className="categories-submenu">
				{genres[0].map((genre) => (
					<div
						className={`genre-item ${selectedGenreStyle(genre)}`}
						key={genre.id}
						onClick={() => searchMovieByGenre(genre)}
					>
						{genre.name}
					</div>
				))}
			</div>
		</>
	);

	const selectedStyle = toggleCategories ? "item-selected" : "";

	return (
		<>
			<nav>
				<MenuIcon
					className="hamburger-icon"
					onClick={() => toggleNav()}
				/>

				<div className="logo" onClick={() => goHome()}>
					FilmClub
				</div>

				{(toggleMenu || screenWidth > 1100) && (
					<div className="menu">
						<ul>
							<li
								className={`item ${selectedStyle}`}
								onClick={() => handleCategoriesClick()}
							>
								<div>Categories</div>
							</li>

							{toggleCategories &&
								screenWidth < 1100 &&
								categoriesSubmenu}

							<li className="search-input">
								<SearchIcon className="icon" />
								<input
									className="search"
									onChange={(event) =>
										setSearchString(event.target.value)
									}
									onKeyUp={searchMovie}
									value={searchString}
									type="text"
									placeholder="Search in titles"
								/>
							</li>

							<li className="item user-admission">
								<UserAddIcon className="icon" />
								<div>Sign up</div>
							</li>
							<li className="item user-admission">
								<LoginIcon className="icon" />
								<div>Log In</div>
							</li>
						</ul>
					</div>
				)}
			</nav>

			{toggleCategories && screenWidth > 1100 && categoriesSubmenu}
		</>
	);
}

export default Navbar;
