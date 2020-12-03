import React from 'react'

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete'

import compass from '../assets/compass.png'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api'

import { formatRelative } from 'date-fns'

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from '@reach/combobox'

import './Map.css'

const mapStyles = [
    {
        featureType: 'all',
        elementType: 'geometry.fill',
        stylers: [
            {
                weight: '2.00',
            },
        ],
    },
    {
        featureType: 'all',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#9c9c9c',
            },
        ],
    },
    {
        featureType: 'all',
        elementType: 'labels.text',
        stylers: [
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'landscape',
        elementType: 'all',
        stylers: [
            {
                color: '#f2f2f2',
            },
        ],
    },
    {
        featureType: 'landscape',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#ffffff',
            },
        ],
    },
    {
        featureType: 'landscape.man_made',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#ffffff',
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'all',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'all',
        stylers: [
            {
                saturation: -100,
            },
            {
                lightness: 45,
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#eeeeee',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#7b7b7b',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'labels.text.stroke',
        stylers: [
            {
                color: '#ffffff',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'all',
        stylers: [
            {
                visibility: 'simplified',
            },
        ],
    },
    {
        featureType: 'road.arterial',
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'transit',
        elementType: 'all',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'all',
        stylers: [
            {
                color: '#46bcec',
            },
            {
                visibility: 'on',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#c8d7d4',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#070707',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [
            {
                color: '#ffffff',
            },
        ],
    },
]

const libraries = ['places']
const mapContainerStyle = {
    width: '100vw',
    height: ' 100vh',
}
const center = {
    lat: 51.048615,
    lng: -114.070847,
}

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
}

export default function App() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })
    const [markers, setMarkers] = React.useState([])

    const [selected, setSelected] = React.useState(null)

    const mapRef = React.useRef()
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map
    }, [])

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng })
        mapRef.current.setZoom(14)
    }, [])

    if (loadError) return 'Error loading maps'
    if (!isLoaded) return 'Loading Maps'

    return (
        <div>
            <Search panTo={panTo} />

            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={11}
                center={center}
                options={options}
                onLoad={onMapLoad}
                onClick={(event) => {
                    setMarkers((current) => [
                        ...current,
                        {
                            lat: event.latLng.lat(),
                            lng: event.latLng.lng(),
                            time: new Date(),
                        },
                    ])
                }}
            >
                {markers.map((marker) => (
                    <Marker
                        key={marker.time.toISOString()}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        /*  icon={{
        url:'./toast.png',
        scaledSize: new window.google.maps.Size(30, 30),
      }} */
                        onClick={() => {
                            setSelected(marker)
                        }}
                    />
                ))}

                {selected ? (
                    <InfoWindow
                        position={{ lat: selected.lat, lng: selected.lng }}
                        onCloseClick={() => {
                            setSelected(null)
                        }}
                    >
                        <div>
                            <h2>Happy Time!</h2>
                            <p>
                                Come and join us{' '}
                                {formatRelative(selected.time, new Date())}
                            </p>
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </div>
    )
}
//Locate Function
function Locate({ panTo }) {
    return (
        <i
            className="location arrow icon"
            onClick={() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        panTo({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        })
                    },
                    () => null,
                    options
                )
            }}
        ></i>
    )
}

//It uses a hook
function Search({ panTo }) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 51.048615, lng: () => -114.070847 },
            radius: 200 * 1000,
        },
    })

    return (
        <>
            <div
                style={{
                    backgroundColor: '#121212',
                }}
            >
                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <i className="nav-link location arrow icon restaurant-listing">
                            <Locate panTo={panTo} />
                        </i>
                    </li>
                    <li className="nav-item">
                        <i className="nav-link list alternate icon restaurant-listing"></i>
                    </li>
                </ul>
            </div>
            <div className="search">
                <Combobox
                    onSelect={async (address) => {
                        setValue(address, false)
                        clearSuggestions()
                        try {
                            const results = await getGeocode({ address })
                            const { lat, lng } = await getLatLng(results[0])
                            panTo({ lat, lng })
                        } catch (error) {
                            console.log('error')
                        }
                        console.log(address)
                    }}
                >
                    <ComboboxInput
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value)
                        }}
                        disable={!ready}
                        placeholder="Look for more Happy Times"
                    />
                    <ComboboxPopover>
                        <ComboboxList>
                            {status === 'OK' &&
                                data.map(({ id, description }) => (
                                    <ComboboxOption
                                        key={id}
                                        value={description}
                                    />
                                ))}
                        </ComboboxList>
                    </ComboboxPopover>
                </Combobox>
            </div>
        </>
    )
}
