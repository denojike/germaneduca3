import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
	const [ nav, setNav ] = useState(false);

	const toggleNav = (e) => {
		setNav(!nav);
		if (e.target && /Home/.test(e.target.textContent)) {
			window.location = '/';
		}
	};
	const navDisplay = nav ? 'toggle-nav' : '';

	return (
		<div className='navbar-wrapper container-fluid bg-primary'>
			<div className='navbar  container'>
				<div className='navbar-logo'>
					<Link to='/'>GermanEduca</Link>
				</div>

				<nav className='navbar-menu'>
					<span onClick={toggleNav} className='bar'>
						<FaBars />
					</span>
					<ul className={`navbar-menu-ul ${navDisplay}`}>
						<li onClick={toggleNav}>
							<Link to='/'>Home</Link>
						</li>
						<li onClick={toggleNav}>
							<Link to='/not-found'>Visa</Link>
						</li>
						<li onClick={toggleNav}>
							<Link to='/not-found'>Living in Germany</Link>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default Navbar;
