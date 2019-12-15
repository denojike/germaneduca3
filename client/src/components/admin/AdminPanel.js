import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { FaSignOutAlt } from 'react-icons/fa';

const AdminPanel = ({ logout, user }) => {
	const logoutUser = () => {
		logout();
		window.location = '/login';
	};

	return (
		<div className='admin-nav container'>
			{user && <div className='user'>&lt;&lt;Welcome {user.name}&gt;&gt;</div>}
			<ul>
				<li>
					<Link to='/add-course'>Add Course</Link>
				</li>

				<li onClick={logoutUser}>
					<span>
						<FaSignOutAlt />
					</span>Logout
				</li>
			</ul>
		</div>
	);
};

AdminPanel.propTypes = {
	logout: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	user: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	user: state.auth.user
});
export default connect(mapStateToProps, { logout })(AdminPanel);
