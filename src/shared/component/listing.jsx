import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import GoogleMapReact from 'google-map-react'

import {
  listingsShowRoute,
  } from '../routes'


const AnyReactComponent = ({ text }) => <div className="marker">{text}</div>

class Listing extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      coordinates: {}
    }
  }


  getCoords(address, area) {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=
      ${address} + ${area}`, {
      method: 'GET',
    })
    .then((res) => {
      return res.json()
    })
    .then((obj) => {
      console.log(obj)
      this.setState({coordinates: obj.results[0].geometry.location})
    })
  }

  componentDidMount() {
    {/*getCoords(this.props.ktichen.address, this.props.kitchen.area)*/}
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=
      ${this.props.kitchen.address} + ${this.props.kitchen.area}`, {
      method: 'GET',
    })
    .then((res) => {
      return res.json()
    })
    .then((obj) => {
      console.log(obj)
      this.setState({coordinates: obj.results[0].geometry.location})
    })
  }
  // Convert to a stateful component
  // Put api call in componentDidMount (because we don't have access to setState in componentWillMount)

  render() {
    return (
      <div className="card col-5">
        <Link
          className="one-listing"
          to={`${listingsShowRoute(this.props.kitchen._id)}`}
        >
          <h3 className="card-header col-12">
            {this.props.kitchen.name}
          </h3>
        </Link>
          <div className="columns col-online">
            <div className="card-image col-6">
              <img
                className="listing-pic"
                src={this.props.kitchen.pictures[0]}
                alt="kitchen"
              />
              <GoogleMapReact
                center={this.state.coordinates}
                defaultZoom={11}
              >
                <AnyReactComponent
                  lat={this.state.coordinates.lat}
                  lng={this.state.coordinates.lng}
                />
              </GoogleMapReact>
              {this.props.user && this.props.user._id === this.props.kitchen.host_id && (
                <button
                  onClick={() => { this.props.handleRemoveListingClick(this.props.kitchen._id) }}
                  id="remove-listing"
                  type="button"
                >Remove Listing</button>
              )}
            </div>
            <div className="card-body text-center col-6">
              <strong>Area:</strong> {this.props.kitchen.area} <br />
              <strong>Rating:</strong> {this.props.kitchen.rating} <br />
              <strong>Features:</strong>
              <ul>
                {Object.keys(this.props.kitchen.features).map((key) => {
                  return <li key={key}><strong>{key}:</strong> {this.props.kitchen.features[key]}</li>
                })}
              </ul>
            </div>
          </div>
      </div>
    )
  }
}

Listing.propTypes = {
  kitchen: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
}

export default Listing
