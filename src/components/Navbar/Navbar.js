import { UserAddIcon } from "@heroicons/react/solid";
import { LoginIcon, MenuIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import axios from "../../axios";
import "./Navbar.css";
import requests from "../../requests";
import { useRecoilState } from "recoil";
import { displayedMoviesState } from "../../atoms/movieAtom";
import { useNavigate} from 'react-router-dom';

function Navbar() {
	const [toggleMenu, setToggleMenu] = useState(false);
	const [searchString, setSearchString] = useState('');
	const [movies, setMovies] = useRecoilState(displayedMoviesState);
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
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

	async function searchMovie(event) {
		if (event.key === 'Enter') {
			const request = await axios.get(`${requests.getMovie}${searchString}`);
			setToggleMenu(!toggleMenu);
			setMovies(request.data.results);
			setSearchString('');
			navigate("/");
		}
	}

	return (
		<nav>
			<MenuIcon className="hamburger-icon" onClick={toggleNav} />

			<div className="logo" onClick={() => navigate("/")}>FilmClub</div>

			{(toggleMenu || screenWidth > 1100) && (
				<div className="menu">
					<ul>
						<li className="item has-submenu">
							Categories
							{/* <ul className="submenu">
								<li>Action</li>
								<li>Adventure</li>
								<li>Drama</li>
								<li>Horror</li>
							</ul> */}
						</li>
						<li className="search-input">
							<SearchIcon className="icon" />
							<input
								className="search"
								onChange={(event) => setSearchString(event.target.value)}
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
	);
}

export default Navbar;
