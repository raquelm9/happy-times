import React from 'react'
import { withRouter } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { AddItemValidationSchema } from './add_item_validations'
import { HttpService } from '../../services/http-service'

class AddItemForm extends React.Component {
    constructor(props) {
        super(props)

        const queryString = this.props.location.search
        const urlParams = new URLSearchParams(queryString)
        const restaurantId = urlParams.get('restaurantId')
        const happyHourId = urlParams.get('happyHourId')

        this.state = {
            itemId: this.props.item ? this.props.item.id : undefined,
        }

        this.restaurantId = restaurantId
        this.happyHourId = this.props.happyHourId || happyHourId
    }

    initialValues(item) {
        if (!item) {
            return {
                id: '',
                name: '',
                description: '',
                price: '',
                category: '',
            }
        }

        return {
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category,
        }
    }

    updateOrCreateItem(restaurantId, happyHourId, item) {
        const { itemId } = this.state

        console.log(itemId)

        const service = new HttpService()

        if (itemId) {
            return service
                .editItem(restaurantId, happyHourId, itemId, item)
                .then((updatedListItems) => {
                    this.props.onAdded(updatedListItems)
                    this.props.onHide()
                })
        } else if (!itemId) {
            return service
                .addItem(restaurantId, happyHourId, item)
                .then((updatedListItems) => {
                    this.props.onAdded(updatedListItems)
                    this.onHide()
                })
        }
    }

    nameItem(values) {
        return {
            id: values.id,
            name: values.name,
            description: values.description,
            price: values.price,
            category: values.category,
        }
    }

    submitForm(values, actions) {
        const item = this.nameItem(values)
        const id = item ? item.id : undefined

        return this.updateOrCreateItem(
            this.restaurantId,
            this.happyHourId,
            item
        )
            .then(() =>
                this.props.history.push(
                    '/admin/restaurant/happy-hour/information'
                )
            )
            .finally(() => {
                this.props.onHide()
            })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <Formik
                            initialValues={this.initialValues(this.props.item)}
                            validationSchema={AddItemValidationSchema}
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
                                            type="name"
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
                                        <label htmlFor="description">
                                            Description
                                        </label>
                                        <Field
                                            type="description"
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
                                        <label htmlFor="price">Price</label>
                                        <Field
                                            type="price"
                                            name="price"
                                            placeholder="Enter price"
                                            className={`form-control ${
                                                touched.price && errors.price
                                                    ? 'is-invalid'
                                                    : ''
                                            }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="price"
                                            className="invalid-feedback"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="category">
                                            Category
                                        </label>
                                        <Field
                                            type="category"
                                            name="category"
                                            placeholder="Enter category"
                                            className={`form-control ${
                                                touched.category &&
                                                errors.category
                                                    ? 'is-invalid'
                                                    : ''
                                            }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="category"
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
            </div>
        )
    }
}

export default withRouter(AddItemForm)
