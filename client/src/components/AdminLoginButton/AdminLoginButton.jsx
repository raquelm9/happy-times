import React from "react";
import AdminLoginForm from "../AdminLoginForm/AdminLoginForm";

class AdminLoginButton extends React.Component {
  render() {
    return (
      <>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Admin Login
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Admin Login Information
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <AdminLoginForm></AdminLoginForm>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AdminLoginButton;
