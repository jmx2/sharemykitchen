import 'babel-polyfill'
import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import OneListing from '../../container/one-listing'
import {
  LISTINGS_UPDATE,
  listingsUpdateRoute,
} from '../../routes'

const ListingDetailPage = (props) => {
  const urlWithId = props.location.pathname
  // console.log('inside listing detail props', props.match.params.id)
  return (
    <div>
      <OneListing urlWithId={urlWithId} />
      <section className="navbar-section">
        <NavLink
          key={'Edit Listing'}
          to={listingsUpdateRoute(props.match.params.id)}
          className="btn btn-link mr-10"
          exact
        >
          {'Edit Listing'}
        </NavLink>
      </section>
    </div>
  )
}

ListingDetailPage.propTypes = {
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
}

export default withRouter(ListingDetailPage)
