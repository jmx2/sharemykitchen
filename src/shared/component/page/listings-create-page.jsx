import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

import ListingsCreate from '../../container/listings-create'

const ListingsCreatePage = (props) => {
  return (
    <div>
      <h2 className="text-center">Share your kitchen!</h2>
      <div className="divider"></div>
      <ListingsCreate history={props.history} />
    </div>
  )
}

ListingsCreatePage.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
}

export default withRouter(ListingsCreatePage)
