import { UserAddIcon } from "@heroicons/react/solid";
import { LoginIcon, MenuIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import axios from "../../axios";
import "./Navbar.css";
import requests from "../../requests";
import { useRecoilState } from "recoil";
import {
	displayedMoviesState,
	genresState,
	loadedState,
} from "../../atoms/movieAtom";
import { useNavigate } from "react-router-dom";

function Navbar() {
	const [toggleMenu, setToggleMenu] = useState(false);
	const [toggleCategories, setToggleCategories] = useState(false);
	const [searchString, setSearchString] = useState("");
	const [movies, setMovies] = useRecoilState(displayedMoviesState);
	const [isLoaded, setIsloaded] = useRecoilState(loadedState);
	const genres = useRecoilState(genresState);
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const [selectedGenre, setSelectedGenre] = useState();
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

	async function fetchPopular() {
		const request = await axios.get(requests.getPopular);
		setMovies(request.data.results);
		setIsloaded(true);
		setSelectedGenre(undefined);
		navigate("/");
		return request;
	}

	async function searchMovie(event) {
		if (event.key === "Enter") {
			setIsloaded(false);
			setSelectedGenre(undefined);
			async function getMovies() {
				const request = await axios.get(
					`${requests.getMovie}${searchString}`
				);
				setToggleMenu(!toggleMenu);
				setMovies(request.data.results);
				setSearchString("");
				setIsloaded(true);
				return request;
			}
			getMovies();
			navigate(`/search/${searchString}`);
		}
	}

	async function searchMovieByGenre(genre) {
		setIsloaded(false);
		setSelectedGenre(genre.id);
		async function getMovies() {
			const request = await axios.get(
				`${requests.getMovieByGenre}${genre.id}`
			);
			setIsloaded(true);
			setMovies(request.data.results);
		}
		getMovies();
		navigate(`/search/${genre.name.toLowerCase()}`);
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

				<div className="logo" onClick={() => fetchPopular()}>
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
