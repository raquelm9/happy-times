import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { withRouter } from 'react-router-dom'
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'
import { HttpService } from '../services/http-service'

import L from 'leaflet'
import 'leaflet/dist/leaflet.js'
import 'leaflet/dist/leaflet.css'

import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
})

L.Marker.prototype.options.icon = DefaultIcon

class MapClient extends React.Component {
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

    viewHappyHour(restaurant) {
        this.props.history.push({
            pathname: '/restaurant/happy-hour',
            search: 'id=' + restaurant.id,
        })
    }

    buildMarkerCard = (restaurant) => {
        const restaurantCoordenates = restaurant.address.coordinates
        return (
            <Marker
                position={[
                    restaurantCoordenates.latitude,
                    restaurantCoordenates.longitude,
                ]}
            >
                <Popup>
                    {restaurant.name}
                    <br></br>
                    {restaurant.address.unit}, {restaurant.address.street}
                    <br></br>
                    <button
                        onClick={() => this.viewHappyHour(restaurant)}
                        type="button"
                        className="btn btn-dark btn-sm"
                    >
                        Details
                    </button>
                </Popup>
            </Marker>
        )
    }

    render() {
        return (
            <>
                <Navbar />
                <MapContainer
                    style={{ width: '100%', height: '100%' }}
                    center={[51.0447, -114.0719]}
                    zoom={13}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                    />
                    {this.state.restaurants.map(this.buildMarkerCard)}
                </MapContainer>
            </>
        )
    }
}

export default withRouter(MapClient)
