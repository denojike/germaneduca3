import React, { Fragment } from "react";
import { withRouter, NavLink } from "react-router-dom";

const BreadCrumb = ({ location }) => {
  //Clean breadcrumb
  let path = location.pathname.split("");
  let index = path.indexOf("/");
  path.splice(index, 1);
  let trimPath = path.join("");
  //Remove ID from Study Breadcrumb
  const studyPath = /study/;
  const updatePath = /addStudy/;
  if (studyPath.test(location.pathname)) {
    trimPath = "study";
  }
  if (updatePath.test(location.pathname)) {
    trimPath = "update study";
  }

  // Active BreadCrumb

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb my-bread-crumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          {trimPath === "study" ? (
            <Fragment>
              <li className="breadcrumb-item">
                <NavLink to={"/search"}>search</NavLink>
              </li>
              <li className="breadcrumb-item">
                <NavLink to={location.pathname}>{trimPath}</NavLink>
              </li>
            </Fragment>
          ) : (
            <li className="breadcrumb-item">
              <NavLink to={location.pathname}>{trimPath}</NavLink>
            </li>
          )}

          {/* <li className="breadcrumb-item active" aria-current="page">
            Study
          </li> */}
        </ol>
      </nav>
    </div>
  );
};

export default withRouter(BreadCrumb);
