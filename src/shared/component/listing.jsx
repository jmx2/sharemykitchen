import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { listingsShowRoute } from '../routes'

const Listing = (props) => {
  console.log('props', props)
  return (
    <div className="card col-5">
      <Link
        className="one-listing"
        to={`${listingsShowRoute(props.kitchen._id)}`}
      >
        <h3 className="card-header col-12">
          {props.kitchen.name}
        </h3>
      </Link>
      <div className="columns col-online">
        <div className="card-image col-6">
          <img
            className="listing-pic"
            src={props.kitchen.pictures[0]}
            alt="kitchen"
          />
          {props.user && props.user._id === props.kitchen.host_id && (
            <button onClick={
              () => { props.handleRemoveListingClick(props.kitchen._id) }
            } id="remove-listing" type="button">Remove Listing</button>
          )}
        </div>
        <div className="card-body text-center col-6">
          <strong>Area:</strong> {props.kitchen.area} <br />
          <strong>Rating:</strong> {props.kitchen.rating} <br />
          <strong>Features:</strong>
          <ul>
            {Object.keys(props.kitchen.features).map((key) => {
              return <li key={key}><strong>{key}:</strong> {props.kitchen.features[key]}</li>
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

Listing.propTypes = {
  kitchen: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  user: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

Listing.defaultProps = {
  user: {},
}

export default Listing
