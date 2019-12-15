import React, { useState } from "react";
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import Input from "../utilsComponents/Input";

const AddUser = ({ register }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const { name, email, password } = formData;

  const onChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    register({ name, email, password });
  };

  return (
    <div>
      <section className="login-section">
        <div className="container">
          <form
            onSubmit={e => onSubmit(e)}
            className="d-flex justify-content-flex flex-column w-75 mx-auto"
          >
            <h1 className="text-center">Admin Area</h1>
            <p className="lead text-center">
              <i className="fas fa-user" /> Register New User
            </p>
            <Input
              label="Name"
              name="name"
              value={name}
              onChange={e => onChange(e)}
            />
            <Input
              type="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={e => onChange(e)}
            />
            <Input
              type="password"
              label="Password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
            />

            <button className="btn text-center"> Register </button>
          </form>
        </div>
      </section>
    </div>
  );
};

AddUser.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { register }
)(AddUser);
