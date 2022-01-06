import "./Navbar.css";
import { UserAddIcon } from "@heroicons/react/solid";
import { LoginIcon, MenuIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";

function Navbar() {
	const [toggleMenu, setToggleMenu] = useState(false);
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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

	return (
		<nav>
			<MenuIcon className="hamburger-icon" onClick={toggleNav} />

			<div className="logo">FilmClub</div>

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
