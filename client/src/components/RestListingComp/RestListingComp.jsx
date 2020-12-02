import React from 'react'
import { withRouter } from 'react-router-dom'
import { todaysHappyHour } from '../../helpers/happy_hour'
import { addressLabel } from '../../helpers/address'

import './RestListingComp.css'

class RestListingComp extends React.Component {
    constructor(props) {
        super(props)
    }

    timeHappyHour() {
        const happyHour = todaysHappyHour(this.props.restaurant)

        if (!happyHour) {
            return ' No Happy Hours Today'
        } else {
            return ' ' + happyHour.startTime + ' - ' + ' ' + happyHour.endTime
        }
    }

    categoryHappyHour() {
        const happyHour = todaysHappyHour(this.props.restaurant)
        const categories = []

        if (!happyHour) return ''

        happyHour.menu.items.forEach((item) => {
            if (!categories.includes(item.category)) {
                categories.push(item.category)
            }
        })

        return categories.join(' & ')
    }

    categoryIcons() {
        const category = this.categoryHappyHour()

        if (category === 'food') {
            return <i className="utensils icon"></i>
        } else if (category === 'drink') {
            return <i className="glass martini icon"></i>
        } else if (category === 'drink & food' || category === 'food & drink') {
            return (
                <>
                    <i className="utensils icon"></i>{' '}
                    <i className="glass martini icon"></i>
                </>
            )
        }
    }

    viewHappyHour() {
        const restaurant = this.props.restaurant

        this.props.history.push({
            pathname: '/restaurant/happy-hour',
            search: 'id=' + restaurant.id,
        })
    }

    showhappyHour() {
        return (
            <>
                <p className="project-happy-hour">
                    Happy Hour:
                    {this.timeHappyHour()}
                </p>
                <p className="project-category">{this.categoryIcons()}</p>
            </>
        )
    }

    render() {
        const restaurant = this.props.restaurant

        return (
            <>
                <div className="row">
                    <div className="col"></div>
                    <div
                        className="project-card-blueprint col-sm-10 col-md-6 col-lg-5"
                        onClick={this.viewHappyHour.bind(this)}
                    >
                        <div className="row">
                            <div
                                className="project-image col-lg-5 col-md-12"
                                style={{
                                    backgroundImage: `url(${restaurant.image})`,
                                }}
                            ></div>
                            <div className="project-name-description col-lg-7 col-md-12">
                                <p className="projects-title">
                                    {restaurant.name}
                                </p>
                                <p className="project-description">
                                    Address: {addressLabel(restaurant)}
                                </p>
                                <>{this.showhappyHour()}</>
                            </div>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
            </>
        )
    }
}

export default withRouter(RestListingComp)
