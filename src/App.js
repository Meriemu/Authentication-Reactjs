import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

//6
import Navbar from "./components/Navbar";

//7
import SignUpModal from "./components/SignUpModal";

//34
import SignInModal from "./components/SignInModal";

//23
import Private from "./pages/Private/Private"
import PrivateHome from "./pages/Private/PrivateHome/PrivateHome"
function App() {
	return (
		<>
		<SignUpModal />
		<SignInModal />

		<Navbar />
			<Routes>
				<Route path="/" element={ <Home /> }/>
				<Route path="/private" element={ <Private /> }>
					<Route path="/private/private-home" element={<PrivateHome />}></Route>
				</Route>
			</Routes>
		</>
	);
}

export default App;
