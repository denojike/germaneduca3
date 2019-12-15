import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import AddTab from "./AddTab";

const Dashboard = ({ loading }) => {
  if (loading)
    return (
      <section className="dashboard">
        <div className="container text-center">
          <div className="col-md-8 mx-auto text-center mt-5 pt-5">
            <div className="spinner-border text-warning" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </section>
    );

  return (
    <section className="dashboard">
      <div className="container text-center">
        <div className="username my-2 py-2">
          <h2 className="text-center blue-text">ADMIN SECTION</h2>
          {/* <p className="blue-text text-center"> You are logged in as {user}</p> */}
        </div>
        <AddTab text="Add Course" path="/addStudy" />
        <AddTab text="Search for Course" path="/search" />
        <AddTab text="Manage Profile" path="/profile" />
      </div>
    </section>
  );
};

Dashboard.propTypes = {
  // user: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStatetoProps = state => ({
  // user: state.auth.user.name,
  loading: state.auth.loading
});

export default connect(mapStatetoProps)(Dashboard);
