import "./App.css";
import FilmClub from "./components/FilmClub";
import { RecoilRoot } from "recoil";

function App() {
	return (
		<RecoilRoot>
			<div className="App">
				<FilmClub />
			</div>
		</RecoilRoot>
	);
}

export default App;
