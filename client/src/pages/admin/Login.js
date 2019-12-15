import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import Button from '../../components/utilsComponents/Button';

const Login = ({ login, isAuthenticated, location, history }) => {
	const [ errors, setErrors ] = useState({ email: '', password: '' });
	const [ formData, setFormData ] = useState({ email: '', password: '' });

	const { email, password } = formData;

	const validateForm = () => {
		const errors = {};
		if (!email) {
			errors.email = 'Email is required';
		}
		if (!password) {
			errors.password = 'Password is required';
		} else if (password.length < 6) {
			errors.password = 'Password must be 6 characters long';
		}
		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const onChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (validateForm()) {
			login(email, password);
		} else {
			return;
		}
	};

	//Redirect if logged in
	let { from } = location.state || { from: { pathname: '/' } };
	if (isAuthenticated) {
		history.push(from);
	}

	return (
		<div className='container'>
			<div className='login'>
				<form className='form' onSubmit={(e) => onSubmit(e)}>
					<div className='form-group'>
						<h2>Login</h2>
					</div>

					<div className='form-group'>
						<p>Login to your account</p>
						<p className=' text-danger'>{errors.email && errors.email}</p>
						<input
							type='text'
							placeholder='Email Address'
							name='email'
							value={email}
							onChange={onChange}
							className='form-control'
						/>
					</div>
					<div className='form-group'>
						<p className='text-center text-danger'>{errors.password && errors.password}</p>
						<input
							type='password'
							placeholder='password'
							name='password'
							value={password}
							onChange={onChange}
							className='form-control'
						/>
					</div>

					<Button text={'Login'} />
				</form>
			</div>
		</div>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(withRouter(Login));
