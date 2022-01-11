import "./App.css";
import FilmClub from "./components/FilmClub";
import { RecoilRoot } from "recoil";
import { Route, Routes } from "react-router-dom";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import MovieGrid from "./components/MovieGrid/MovieGrid";
import React from "react";

function App() {
	return (
		<RecoilRoot>
			<React.Suspense fallback={<div>Loading...</div>}>
				<div className="App">
					<Routes>
						<Route path="/" element={<FilmClub />}>
							<Route path="/" element={<MovieGrid />}></Route>
							<Route path="/search/:searchString" element={<MovieGrid />}></Route>
							<Route path="/movies/:movieId" element={<MovieDetail />}></Route>
						</Route>
					</Routes>
				</div>
			</React.Suspense>
		</RecoilRoot>
	);
}

export default App;
