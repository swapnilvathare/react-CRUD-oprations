import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends Component {
  renderError({ touched, error }) {
    // console.log(error);
    if (touched && error) {
      return (
        <div className="ui error message show">
          <div className="header">{error}</div>
        </div>
      );
    }
  }
  renderInput = ({ input, label, meta }) => {
    // this.renderError({ touched, error });
    // console.log(meta);
    const className = `field ${meta.touched && meta.error ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} type="text" placeholder={label} />
        {this.renderError(meta)}
      </div>
    );
  };
  //above we modified this function to use less syntax.
  // renderInput(formProps) {
  //   return <input {...formProps.input} />;
  // }
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };
  render() {
    // console.log(this.props);
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate,
})(StreamForm);
