import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AddRestaurantValidationSchema } from "./validations/add_restaurant_validations";
import { HttpService } from "../../services/http-service";
import { base64Encode } from "../../helpers/images";

const initialValues =
  process.env.NODE_ENV === "development"
    ? {
        id: "9999",
        name: "New Restaurant",
        website: "http://restaurant.com",
        description: "A fancy restaurant",
        addressUnit: "109",
        addressStreet: "15",
        addressPostalcode: "T2R0Y6",
        addressCity: "Calgary",
        addressProvince: "Alberta",
      }
    : {
        id: "",
        name: "",
        website: "",
        description: "",
        addressUnit: "",
        addressStreet: "",
        addressPostalcode: "",
        addressCity: "",
        addressProvince: "",
      };

class AddRestaurantForm extends React.Component {
  submitForm(values, actions) {
    base64Encode(values.image)
      .then((encodedImage) => ({
        id: values.id,
        name: values.name,
        description: values.description,
        website: values.website,
        image: encodedImage,
        address: {
          unit: values.addressUnit,
          street: values.addressStreet,
          postalCode: values.addressPostalcode,
          city: values.addressCity,
          province: values.addressProvince,
        },
      }))
      .then((newRestaurant) => new HttpService().addRestaurant(newRestaurant))
      .finally(() => {
        actions.setSubmitting(false);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-12 text-center">
            <h1 className="mt-5">Restaurant Detail Information</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Formik
              initialValues={initialValues}
              validationSchema={AddRestaurantValidationSchema}
              onSubmit={this.submitForm.bind(this)}
            >
              {({ touched, errors, isSubmitting, setFieldValue }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <Field
                      type="id"
                      name="id"
                      placeholder="Enter ID"
                      className={`form-control ${
                        touched.id && errors.id ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="name"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <Field
                      type="name"
                      name="name"
                      placeholder="Enter name"
                      className={`form-control ${
                        touched.name && errors.name ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="name"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="website">Website</label>
                    <Field
                      type="website"
                      name="website"
                      placeholder="Enter website"
                      className={`form-control ${
                        touched.website && errors.website ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="website"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <Field
                      type="description"
                      name="description"
                      placeholder="Enter description"
                      className={`form-control ${
                        touched.description && errors.description
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="description"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input
                      type="file"
                      name="image"
                      onChange={(event) => {
                        setFieldValue("image", event.currentTarget.files[0]);
                      }}
                    />
                    <ErrorMessage
                      component="div"
                      name="image"
                      className="invalid-feedback"
                    />
                  </div>

                  <br></br>
                  <h2>Address:</h2>
                  <br></br>

                  <div className="row">
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label htmlFor="addressUnit">Unit</label>
                        <Field
                          type="addressUnit"
                          name="addressUnit"
                          placeholder="Enter Unit"
                          className={`form-control ${
                            touched.addressUnit && errors.addressUnit
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="addressUnit"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="form-group">
                        <label htmlFor="addressStreet">Street</label>
                        <Field
                          type="addressStreet"
                          name="addressStreet"
                          placeholder="Enter Street"
                          className={`form-control ${
                            touched.addressStreet && errors.addressStreet
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="addressStreet"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="form-group">
                        <label htmlFor="addressPostalcode">Postal Code</label>
                        <Field
                          type="addressPostalcode"
                          name="addressPostalcode"
                          placeholder="Enter Postal Code"
                          className={`form-control ${
                            touched.addressPostalcode &&
                            errors.addressPostalcode
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="addressPostalcode"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label htmlFor="addressCity">City</label>
                        <Field
                          type="addressCity"
                          name="addressCity"
                          placeholder="Enter City"
                          className={`form-control ${
                            touched.addressCity && errors.addressCity
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="addressCity"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group">
                        <label htmlFor="addressProvince">Province</label>
                        <Field
                          type="addressProvince"
                          name="addressProvince"
                          placeholder="Enter Province"
                          className={`form-control ${
                            touched.addressProvince && errors.addressProvince
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name="addressProvince"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Please wait..." : "Submit"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}

export default AddRestaurantForm;
