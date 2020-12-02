import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { AddRestaurantValidationSchema } from './validations/add_restaurant_validations'
import { HttpService } from '../../services/http-service'
import { base64Encode } from '../../helpers/images'
import { withRouter } from 'react-router-dom'
import './AdminRestaurantForm.css'
import '../../pages/AdminRestaurants.css'

class AddRestaurantForm extends React.Component {
    initialValues(restaurant) {
        if (!restaurant) {
            return {
                id: '',
                name: '',
                description: '',
                image: '',
                website: '',
                addressUnit: '',
                addressStreet: '',
                addressPostalcode: '',
                addressCity: '',
                addressProvince: '',
            }
        } else {
            return {
                id: restaurant.id,
                name: restaurant.name,
                description: restaurant.description,
                image: restaurant.image,
                website: restaurant.website,
                addressUnit: restaurant.address.unit,
                addressStreet: restaurant.address.street,
                addressPostalcode: restaurant.address.postalCode,
                addressCity: restaurant.address.city,
                addressProvince: restaurant.address.province,
            }
        }
    }

    /**
     * @returns Promise
     */
    getImageForUpload(values) {
        if (!values.image) {
            throw new Error('Image is required')
        }

        if (values.image instanceof File) {
            // File
            return base64Encode(values.image)
        } else if (!(values.image instanceof File)) {
            // http://<backedn-url>/uploads/image.png
            return Promise.resolve(values.image)
        }
    }

    updateOrCreateRestaurant(id, restaurant) {
        const service = new HttpService()

        if (id) {
            return service.editRestaurant(id, restaurant)
        } else if (!id) {
            return service.addRestaurant(restaurant)
        }
    }

    submitForm(values, actions) {
        this.getImageForUpload(values)
            .then((encodedImage) => ({
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
            .then((restaurant) => {
                const id = this.props.restaurant
                    ? this.props.restaurant.id
                    : undefined
                return this.updateOrCreateRestaurant(id, restaurant)
            })
            .then((restaurant) =>
                this.props.history.push({
                    pathname: '/admin/restaurant/happy-hour',
                    search: 'id=' + restaurant.id,
                })
            )
            .finally(() => {
                actions.setSubmitting(false)
            })
    }

    render() {
        return (
            <>
                <p className="admin-access">Admin Access</p>
                <div className="container">
                    <p className="admin-restaurants-title">
                        Restaurant Detail Information
                    </p>

                    <div className="row">
                        <div className="col-lg-12">
                            <Formik
                                initialValues={this.initialValues(
                                    this.props.restaurant
                                )}
                                validationSchema={AddRestaurantValidationSchema}
                                onSubmit={this.submitForm.bind(this)}
                            >
                                {({
                                    touched,
                                    errors,
                                    isSubmitting,
                                    setFieldValue,
                                }) => (
                                    <Form>
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <Field
                                                name="name"
                                                placeholder="Enter name"
                                                className={`form-control ${
                                                    touched.name && errors.name
                                                        ? 'is-invalid'
                                                        : ''
                                                }`}
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="name"
                                                className="invalid-feedback"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="website">
                                                Website
                                            </label>
                                            <Field
                                                name="website"
                                                placeholder="Enter website"
                                                className={`form-control ${
                                                    touched.website &&
                                                    errors.website
                                                        ? 'is-invalid'
                                                        : ''
                                                }`}
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="website"
                                                className="invalid-feedback"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="description">
                                                Description
                                            </label>
                                            <Field
                                                name="description"
                                                placeholder="Enter description"
                                                className={`form-control ${
                                                    touched.description &&
                                                    errors.description
                                                        ? 'is-invalid'
                                                        : ''
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
                                            <br></br>
                                            <input
                                                type="file"
                                                name="image"
                                                onChange={(event) => {
                                                    setFieldValue(
                                                        'image',
                                                        event.currentTarget
                                                            .files[0]
                                                    )
                                                }}
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="image"
                                                className="invalid-feedback"
                                            />
                                        </div>

                                        {this.props.restaurant ? (
                                            <img
                                                className="adminImage"
                                                src={
                                                    this.props.restaurant.image
                                                }
                                            />
                                        ) : null}

                                        <br></br>
                                        <br></br>
                                        <h3>Address:</h3>
                                        <br></br>

                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="form-group">
                                                    <label htmlFor="addressUnit">
                                                        Unit
                                                    </label>
                                                    <Field
                                                        name="addressUnit"
                                                        placeholder="Enter Unit"
                                                        className={`form-control ${
                                                            touched.addressUnit &&
                                                            errors.addressUnit
                                                                ? 'is-invalid'
                                                                : ''
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
                                                    <label htmlFor="addressStreet">
                                                        Street
                                                    </label>
                                                    <Field
                                                        name="addressStreet"
                                                        placeholder="Enter Street"
                                                        className={`form-control ${
                                                            touched.addressStreet &&
                                                            errors.addressStreet
                                                                ? 'is-invalid'
                                                                : ''
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
                                                    <label htmlFor="addressPostalcode">
                                                        Postal Code
                                                    </label>
                                                    <Field
                                                        name="addressPostalcode"
                                                        placeholder="Enter Postal Code"
                                                        className={`form-control ${
                                                            touched.addressPostalcode &&
                                                            errors.addressPostalcode
                                                                ? 'is-invalid'
                                                                : ''
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
                                                    <label htmlFor="addressCity">
                                                        City
                                                    </label>
                                                    <Field
                                                        name="addressCity"
                                                        placeholder="Enter City"
                                                        className={`form-control ${
                                                            touched.addressCity &&
                                                            errors.addressCity
                                                                ? 'is-invalid'
                                                                : ''
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
                                                    <label htmlFor="addressProvince">
                                                        Province
                                                    </label>
                                                    <Field
                                                        name="addressProvince"
                                                        placeholder="Enter Province"
                                                        className={`form-control ${
                                                            touched.addressProvince &&
                                                            errors.addressProvince
                                                                ? 'is-invalid'
                                                                : ''
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
                                            {isSubmitting
                                                ? 'Please wait...'
                                                : 'Submit'}
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(AddRestaurantForm)
