import React from 'react'
import { HttpService } from '../services/http-service'
import AdminRestListingComp from '../components/AdminRestListingComp/AdminRestListingComp'
import PaddedContainerSegment from '../components/PaddedContainerSegment/PaddedContainerSegment'
import AddRestaurant from '../components/AddRestaurant/AddRestaurant'
import './AdminRestaurants.css'

class AdminRestaurants extends React.Component {
    constructor(props) {
        super(props)

        this.state = { restaurants: [] }
    }

    componentDidMount() {
        this.loadData()
    }

    loadData = () => {
        new HttpService().getRestaurants().then(
            (data) => {
                this.setState({ restaurants: data })
            },
            (err) => {}
        )
    }

    buildRestaurants = () => {
        const list = this.state.restaurants.map((restaurant) => (
            <div className="row" key={restaurant.id}>
                <div className="column">
                    <PaddedContainerSegment>
                        <AdminRestListingComp
                            restaurant={restaurant}
                            onDelete={this.loadData.bind(this)}
                        />
                    </PaddedContainerSegment>
                </div>
            </div>
        ))

        return list
    }

    render() {
        return (
            <div>
                <p className="admin-access">Admin Access</p>
                <p className="admin-restaurants-title">Restaurants</p>
                <div className="ui stackable one column padded grid">
                    {this.buildRestaurants()}
                </div>
                <AddRestaurant></AddRestaurant>
            </div>
        )
    }
}

export default AdminRestaurants
