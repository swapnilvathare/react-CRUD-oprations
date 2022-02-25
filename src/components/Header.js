import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <div className="item">
        <Link to="/">Streams</Link>
      </div>
      <div className="right menu">
        <Link to="/" className="ui item">
          Logout
        </Link>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
