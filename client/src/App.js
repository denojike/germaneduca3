import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
// import Footer from './components/footer/Footer';
import { loadUser } from './actions/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import TopMenu from './components/TopMenu';
import './App.scss';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import Home from './pages/Home';
import { getAllStudies } from './actions/study';

//Check for user
if (localStorage.token) {
	setAuthToken(localStorage.token);
}

function App() {
	useEffect(() => {
		store.dispatch(loadUser());
		store.dispatch(getAllStudies());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<ToastContainer />
				<Home />
				{/* <TopMenu />
        <Footer /> */}
			</Router>
		</Provider>
	);
}

export default App;
