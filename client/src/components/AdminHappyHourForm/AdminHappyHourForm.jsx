import React from 'react'
import { withRouter } from 'react-router-dom'
import AdminItemListing from '../AdminItemListing/AdminItemListing'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { AddHappyHourValidationSchema } from './validation/add_happy_hour_validation'
import { DaysField } from './DaysField'
import { HappyHourService } from '../../services/happy_hour_service'

class AdminHappyHourForm extends React.Component {
    constructor(props) {
        super(props)

        const queryString = this.props.location.search
        const urlParams = new URLSearchParams(queryString)
        this.restaurantId = urlParams.get('restaurantId')
    }

    initialValues(happyHour) {
        if (!happyHour) {
            return {
                startTime: '',
                endTime: '',
                openDays: [],
            }
        }
        return {
            startTime: happyHour.startTime,
            endTime: happyHour.endTime,
            openDays: happyHour.openDays.days.map((day) => `${day}`),
        }
    }

    happyHourItems() {
        if (!this.props.happyHour) {
            return []
        }

        return this.props.happyHour.menu.items
    }

    submitForm(happyHourValues) {
        return HappyHourService.createHappyHour(
            this.restaurantId,
            happyHourValues
        )
    }

    render() {
        return (
            <div className="container">
                <div className="row mb-5">
                    <div className="col-lg-12 text-center">
                        <h1 className="mt-5"></h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <Formik
                            initialValues={this.initialValues(
                                this.props.happyHour
                            )}
                            validationSchema={AddHappyHourValidationSchema}
                            onSubmit={this.submitForm.bind(this)}
                        >
                            {({ touched, errors, isSubmitting }) => (
                                <Form>
                                    <DaysField name={'openDays'} />

                                    <div className="form-group">
                                        <label htmlFor="startTime">
                                            Start Time
                                        </label>
                                        <Field
                                            type="startTime"
                                            name="startTime"
                                            placeholder="Enter Start Time"
                                            className={`form-control ${
                                                touched.startTime &&
                                                errors.startTime
                                                    ? 'is-invalid'
                                                    : ''
                                            }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="startTime"
                                            className="invalid-feedback"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="endTime">
                                            End Time
                                        </label>
                                        <Field
                                            type="endTime"
                                            name="endTime"
                                            placeholder="Enter End Time"
                                            className={`form-control ${
                                                touched.endTime &&
                                                errors.endTime
                                                    ? 'is-invalid'
                                                    : ''
                                            }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="endTime"
                                            className="invalid-feedback"
                                        />
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
                <div className="row">
                    <div className="col-lg-12">
                        <AdminItemListing
                            items={this.happyHourItems()}
                        ></AdminItemListing>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AdminHappyHourForm)
