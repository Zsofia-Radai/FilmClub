import "./App.css";
import FilmClub from "./components/FilmClub";
import { RecoilRoot } from "recoil";
import { Route, Routes } from "react-router-dom";

function App() {
	return (
		<RecoilRoot>
			<div className="App">
				<Routes>
					<Route path="/" element={<FilmClub />}></Route>
				</Routes>
			</div>
		</RecoilRoot>
	);
}

export default App;
