import React from "react";
import { Link } from "react-router-dom";

const AddTab = ({ text, path }) => {
  return (
    <div className="row">
      <div className="col">
        <div className="card mb-4">
          <div className="card-text text-center p-2">
            <button className="btn btn-block">
              {" "}
              <Link to={path}>{text}</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTab;
