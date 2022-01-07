import "./App.css";
import FilmClub from "./components/FilmClub";
import { RecoilRoot } from "recoil";
import { Route, Routes } from "react-router-dom";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import MovieGrid from "./components/MovieGrid/MovieGrid";

function App() {
	return (
		<RecoilRoot>
			<div className="App">
				<Routes>
					<Route path="/" element={<FilmClub />}>
						<Route path="/" element={<MovieGrid />}></Route>
						<Route path="/movies/:movieId" element={<MovieDetail />}></Route>
					</Route>
				</Routes>
			</div>
		</RecoilRoot>
	);
}

export default App;
