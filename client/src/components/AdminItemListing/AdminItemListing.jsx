import React from 'react'
import { itemsByCategory } from '../../helpers/happy_hour'
import HappyHourItem from '../../components/HappyHourMenu/HappyHourItem'
import { HttpService } from '../../services/http-service'
import { withRouter } from 'react-router-dom'
import AddItem from '../AddItem/AddItem'
import '../../pages/AdminRestaurants.css'
import './AdminItemListing.css'

class AdminItemListing extends React.Component {
    constructor(props) {
        super(props)

        const queryString = this.props.location.search
        const urlParams = new URLSearchParams(queryString)
        const restaurantId = urlParams.get('restaurantId')

        this.restaurantId = restaurantId

        this.state = {
            happyHourItems: props.items,
        }
    }

    loadHappyHour() {
        return new HttpService()
            .getRestaurantHappyHour(this.restaurantId, this.props.happyHourId)
            .then((updatedHappyHour) =>
                this.setState({
                    happyHourItems: updatedHappyHour.menu.items,
                })
            )
    }

    renderItems() {
        const items = this.state.happyHourItems

        if (!items) {
            return []
        }

        const categorizedItems = itemsByCategory(items)

        return (
            <>
                {categorizedItems.food.length > 0 ? (
                    <div className="menu-category">
                        {this.renderItemsWithCategory(
                            'Food',
                            categorizedItems.food
                        )}
                    </div>
                ) : null}
                {categorizedItems.drink.length > 0 ? (
                    <div className="menu-category">
                        {this.renderItemsWithCategory(
                            'Drinks',
                            categorizedItems.drink
                        )}
                    </div>
                ) : null}
            </>
        )
    }

    renderItemsWithCategory(categoryName, items) {
        return (
            <>
                <h4 className="title-category">{categoryName}</h4>
                {items.map((item) => (
                    <HappyHourItem
                        item={item}
                        key={item.id}
                        admin={true}
                        onDelete={this.loadHappyHour.bind(this)}
                        adjItem={this.loadHappyHour.bind(this)}
                        happyHourId={this.props.happyHourId}
                    />
                ))}
            </>
        )
    }

    render() {
        return (
            <>
                <br></br>
                <hr></hr>
                <p className="admin-restaurants-title">
                    Menu Items<br></br>
                </p>
                {this.renderItems()}
                <AddItem
                    onAdded={this.loadHappyHour.bind(this)}
                    happyHourId={this.props.happyHourId}
                />
            </>
        )
    }
}

export default withRouter(AdminItemListing)
