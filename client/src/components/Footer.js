import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const date = new Date().toLocaleDateString();
  return (
    <div className="container">
      <div className="row bg-light my-footer">
        <div className="col d-flex justify-content-center align-items-center">
          <p>
            &copy;<a href="/">GermanEduca</a> {date}
          </p>
        </div>
        <div className="arrow-up">
          <a href="#logo">
            <FontAwesomeIcon icon={faArrowUp} size="lg"></FontAwesomeIcon>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
