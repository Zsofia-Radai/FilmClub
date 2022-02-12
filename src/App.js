import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import FilmClub from "./components/FilmClub";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import MovieGrid from "./components/MovieGrid/MovieGrid";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<FilmClub />}>
					<Route path="/" element={<MovieGrid />}></Route>
					<Route
						path="/search/:searchString"
						element={<MovieGrid />}
					></Route>
					<Route
						path="/movies/:movieId"
						element={<MovieDetail />}
					></Route>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
