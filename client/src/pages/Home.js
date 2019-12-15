import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Crud from '../components/Crud';
import Courses from './Courses';
import SingleCourse from './SingleCourse';
import AddCourse from './admin/AddCourse';
import AdminPanel from '../components/admin/AdminPanel';
import Login from '../pages/admin/Login';
import PrivateRoute from '../components/routing/PrivateRoute';
import NotFound from '../components/NotFound';

const Home = ({ isAuthenticated }) => {
	return (
		<Fragment>
			{isAuthenticated && <AdminPanel />}
			{!isAuthenticated && <Crud />}
			<Navbar />
			<Switch>
				<Route exact path='/' component={Courses} />
				<PrivateRoute exact path='/add-course' component={AddCourse} />
				<PrivateRoute path='/add-course/:id' component={AddCourse} />
				<Route path='/login' component={Login} />
				<Route path='/courses/:id' component={SingleCourse} />
				<Route to='/not-found' component={NotFound} />
			</Switch>
		</Fragment>
	);
};

AddCourse.propTypes = {
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Home);
