import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { deleteStream, fetchStream } from "../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class StreamDelete extends React.Component {
  componentDidMount() {
    console.log(this.props.match.params.id);
    this.props.fetchStream(this.props.match.params.id);
  }
  onDelete = () => {
    this.props.deleteStream(this.props.match.params.id);
  };
  renderActions() {
    return (
      <React.Fragment>
        <button onClick={this.onDelete} className="ui negative button">
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }
  renderContent() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?";
    }
    return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`;
  }
  render() {
    console.log(this.props.stream);
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
