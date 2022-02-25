import React from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamShow extends React.Component {
  componentDidMount() {
    console.log(this.props);
    this.props.fetchStream(this.props.match.params.id);
  }
  render() {
    console.log(this.props.stream);
    if (!this.props.stream) {
      return "Loading...";
    }
    const { title, description } = this.props.stream;
    return (
      <div className="ui card" style={{ width: "100%" }}>
        <div className="image">
          <img
            src="https://semantic-ui.com/images/avatar2/large/kristy.png"
            height="250"
          />
        </div>
        <div className="content">
          <h2 className="header">{title}</h2>
          <div className="description">{description}</div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
