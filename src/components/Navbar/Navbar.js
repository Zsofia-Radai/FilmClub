import { LoginIcon, MenuIcon } from "@heroicons/react/outline";
import { SearchIcon, UserAddIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchGenres } from "../../store/moviesActions";
import { moviesActions } from "../../store/moviesSlice";
import "./Navbar.css";

function Navbar() {
	const [toggleMenu, setToggleMenu] = useState(false);
	const [toggleCategories, setToggleCategories] = useState(false);
	const [searchString, setSearchString] = useState("");
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const navigate = useNavigate();
	const genres = useSelector((state) => state.genres);
	const selectedGenre = useSelector((state) => state.selectedGenre);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchGenres());
	}, [dispatch]);

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

	function getPopularMovies() {
		dispatch(moviesActions.setSelectedGenre(null));
		dispatch(moviesActions.setQuery(null));
		switchSearchType();
		navigate("/");
	}

	function searchMovie(event) {
		if (event.key === "Enter") {
			dispatch(moviesActions.setQuery(searchString));
			dispatch(moviesActions.setSelectedGenre(null));
			navigate(`/search/${searchString}`);
			switchSearchType();
		}
	}

	function searchMovieByGenre(genre) {
		dispatch(moviesActions.setSelectedGenre(genre.id));
		navigate(`/search/${genre.name.toLowerCase()}`);
		dispatch(moviesActions.setQuery(null));
		switchSearchType();
	}

	function switchSearchType() {
		dispatch(moviesActions.setMovies([]));
		dispatch(moviesActions.setPageNumber(1));
		dispatch(moviesActions.setLoading(true));
		setSearchString("");
	}

	const selectedGenreStyle = (genre) =>
		selectedGenre === genre.id ? "genre-selected" : "";

	const categoriesSubmenu = (
		<>
			<hr className="submenu-separator" />
			<div className="categories-submenu">
				{genres?.map((genre) => (
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

				<div className="logo" onClick={() => getPopularMovies()}>
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
