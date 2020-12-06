import React from 'react'
import { withRouter } from 'react-router-dom'
import AdminItemListing from '../AdminItemListing/AdminItemListing'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { AddHappyHourValidationSchema } from './validation/add_happy_hour_validation'
import { DaysField } from './DaysField'
import { HappyHourService } from '../../services/happy_hour_service'
import swal from 'sweetalert'
import '../../pages/AdminRestaurants.css'

class AdminHappyHourForm extends React.Component {
    constructor(props) {
        super(props)

        const queryString = this.props.location.search
        const urlParams = new URLSearchParams(queryString)
        this.restaurantId = urlParams.get('restaurantId')

        this.state = {
            happyHourId: urlParams.get('happyHourId'),
        }
    }

    initialValues(happyHour) {
        if (!happyHour) {
            return {
                id: '',
                startTime: '',
                endTime: '',
                openDays: [],
            }
        }
        return {
            id: happyHour.id,
            startTime: happyHour.startTime,
            endTime: happyHour.endTime,
            openDays: happyHour.openDays.map((day) => `${day}`),
        }
    }

    goToHH(event) {
        event.preventDefault()
        this.props.history.goBack()
    }

    happyHourItems() {
        if (!this.props.happyHour) {
            return []
        }

        return this.props.happyHour.menu.items
    }

    alertAndCreate(newHappyHour) {
        swal('Good job!', 'Happy Hour successfully created!', 'success')

        return this.props.onCreate(newHappyHour)
    }

    alertAndEdit(newHappyHour) {
        swal('Good job!', 'Happy Hour successfully edited!', 'success')

        return this.props.onCreate(newHappyHour)
    }

    submitForm(happyHourValues) {
        const { happyHourId } = this.state

        if (!happyHourId) {
            return HappyHourService.createHappyHour(
                this.restaurantId,
                happyHourValues
            ).then((newHappyHour) => {
                this.setState({ happyHourId: newHappyHour.id })
                this.alertAndCreate(newHappyHour)

                const data = {
                    restaurantId: this.restaurantId,
                    happyHourId: this.state.happyHourId,
                }

                const searchParams = new URLSearchParams(data)

                this.props.history.push({
                    pathname: '/admin/restaurant/happy-hour/information',
                    search: searchParams.toString(),
                })
            })
        }

        return HappyHourService.editHappyHour(
            this.restaurantId,
            happyHourId,
            happyHourValues
        ).then((newHappyHour) => this.alertAndEdit(newHappyHour))
    }

    render() {
        return (
            <>
                <p className="admin-access">Admin Access</p>
                <div className="container">
                    <p className="admin-restaurants-title">
                        Happy Hour Detail<br></br>
                    </p>
                    <div className="row">
                        <div
                            className="col-lg-12"
                            style={{
                                backgroundColor: '#F3F3F3',
                            }}
                        >
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

                                        <div className="row">
                                            <div className="col-12">
                                                <button
                                                    className="btn btn-secondary btn-lg"
                                                    onClick={this.goToHH.bind(
                                                        this
                                                    )}
                                                >
                                                    Cancel
                                                </button>

                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-lg"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting
                                                        ? 'Please wait...'
                                                        : 'Submit'}
                                                </button>
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <AdminItemListing
                                happyHourId={this.state.happyHourId}
                                items={this.happyHourItems()}
                            ></AdminItemListing>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(AdminHappyHourForm)
