import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut, singOut } from "../actions";

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "545794631849-8btu2k463iuanm4034l7nslj5s99tjmu.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      return this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      return this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth = window.gapi.auth2.getAuthInstance();
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth = window.gapi.auth2.getAuthInstance();
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui google red button" onClick={this.onSignOutClick}>
          <i className="icon google" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui google red button" onClick={this.onSignInClick}>
          <i className="icon google" />
          Sign in with Google
        </button>
      );
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStatToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStatToProps, { signIn, signOut })(GoogleAuth);
