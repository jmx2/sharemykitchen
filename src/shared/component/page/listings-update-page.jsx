import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

import ListingsUpdate from '../../container/listings-update'


const ListingsUpdatePage = (props) => {
  return (
    <div>
      <div className="divider" />
      <ListingsUpdate history={props.history} />
    </div>
  )
}

ListingsUpdatePage.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
}

export default withRouter(ListingsUpdatePage)
