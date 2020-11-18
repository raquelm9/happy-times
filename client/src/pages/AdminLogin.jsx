import React from "react";
import { withRouter } from "react-router-dom";

class AdminLoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formValues: {
        email: "",
        password: "",
      },

      formErrors: {
        email: "",
        password: "",
      },

      formValidity: {
        email: false,
        password: false,
      },

      isSubmitting: false,
    };
  }

  handleChange = ({ target }) => {
    const { formValues } = this.state;
    formValues[target.name] = target.value;
    this.setState({ formValues });
    this.handleValidation(target);
  };

  handleValidation = (target) => {
    const { name, value } = target;
    const fieldValidationErrors = this.state.formErrors;
    const validity = this.state.formValidity;
    const isEmail = name === "email";
    const isPassword = name === "password";
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    validity[name] = value.length > 0;
    fieldValidationErrors[name] = validity[name]
      ? ""
      : `${name} is required and cannot be empty`;

    if (validity[name]) {
      if (isEmail) {
        validity[name] = emailTest.test(value);
        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${name} should be a valid email address`;
      }
      if (isPassword) {
        validity[name] = value.length >= 3;
        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${name} should be 3 characters minimum`;
      }
    }

    this.setState({
      formErrors: fieldValidationErrors,
      formValidity: validity,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isSubmitting: true });
    const { formValues, formValidity } = this.state;
    if (Object.values(formValidity).every(Boolean)) {
      alert("Form is validated! Submitting the form...");
      this.setState({ isSubmitting: false });
      if (
        this.state.formValues.email === "abc@gmail.com" &&
        this.state.formValues.password === "123"
      ) {
        this.props.history.push("/admin/restaurants");
      }
    } else {
      for (let key in formValues) {
        let target = {
          name: key,
          value: formValues[key],
        };
        this.handleValidation(target);
      }
      this.setState({ isSubmitting: false });
    }
  };

  render() {
    const { formValues, formErrors, isSubmitting } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit} className="px-4 py-3">
          <div className="form-group">
            <label for="exampleDropdownFormEmail1">Email address</label>
            <input
              type="email"
              name="email"
              className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
              id="exampleDropdownFormEmail1"
              placeholder="email@example.com"
              onChange={this.handleChange}
              value={formValues.email}
            />
            <div className="invalid-feedback">{formErrors.email}</div>
          </div>
          <div className="form-group">
            <label for="exampleDropdownFormPassword1">Password</label>
            <input
              type="password"
              className={`form-control ${
                formErrors.password ? "is-invalid" : ""
              }`}
              id="exampleDropdownFormPassword1"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              value={formValues.password}
            />
            <div className="invalid-feedback">{formErrors.password}</div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Please wait..." : "Submit"}
            </button>
          </div>
        </form>
      </>
    );
  }
}

export default withRouter(AdminLoginForm);
