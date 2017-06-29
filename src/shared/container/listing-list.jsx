/* eslint-disable react/no-array-index-key */

import React from 'react'
import PropTypes from 'prop-types'

import { LISTINGS_INDEX } from '../routes'
import Listing from '../component/listing'

class ListingList extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      listings: [],
    }
    this.handleRemoveListingClick = (id) => {
      fetch('http://localhost:8000/api/listings/' + id, {
      	method: 'DELETE', credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(() => {
        const that = this
        const url = `/api${LISTINGS_INDEX + this.props.query}`
        fetch(url)
          .then((response) => {
            return response.json()
          })
          .then((listings) => {
            that.setState({
              listings,
            })
          })
      })
      // console.log(this.state.listings)
    }
  }

  componentDidMount() {
    const that = this
    const url = `/api${LISTINGS_INDEX + this.props.query}`
    fetch(url)
      .then((response) => {
        return response.json()
      })
      .then((listings) => {
        that.setState({
          listings,
        })
      })
  }

  render() {
    return (
      <div className="listing-list">
        <div className="divider">
          <div className="columns one-line">
            {this.state.listings.map((kitchen) => {
              return (
                <Listing
                  key={kitchen._id}
                  kitchen={kitchen}
                  handleRemoveListingClick={this.handleRemoveListingClick}
                />
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

ListingList.propTypes = {
  query: PropTypes.string.isRequired,
}

export default ListingList
