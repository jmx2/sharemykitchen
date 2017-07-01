//put stuff here
import 'babel-polyfill'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { listingsCreateAsync } from '../action/listings'
import AddMoreSelect from '../component/add-more-select'
import ImageUpload from './image-upload'
import ListingPreview from '../component/listing-preview'

import {
  LISTINGS_INDEX,
  listingsShowRoute,
  LISTINGS_UPDATE,
 } from '../routes'

const FORM_FIELDS = [
  { name: 'name', label: 'Name', type: 'text', value:'name' },
  { name: 'address', label: 'Address', type: 'adress', value: 'address' },
  { name: 'rate', label: 'Rate (USD/Day)', type: 'number', value: 50 },
  { name: 'area', label: 'Area', type: 'text', tagName: 'textarea', value: 'area' },
]

class ListingsCreate extends Component {
  constructor(props) {
    super(props)
    this.state = FORM_FIELDS.reduce((acc, curr) => {
      return Object.assign({}, acc, { [curr.name]: null })
    }, {
      features: [],
      pictures: [],
    })
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onAddMoreSelectChange = this.onAddMoreSelectChange.bind(this)
    this.onFileUpload = this.onFileUpload.bind(this)
  }

  componentDidMount() {
    const that = this
    const url = `/api${'/listings/' + this.props.history.location.pathname.slice(17)}`
    fetch(url)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        // console.log('response in update', data)
        this.setState({address: data.address, area: data.area, name: data.name, rate: data.rate, pictures: data.pictures, features: data.features})
        // FORM_FIELDS[0].value = data.name
        // FORM_FIELDS[1].value = data.address
        // FORM_FIELDS[2].value = data.rate
        // FORM_FIELDS[3].value = data.area
        // console.log('state', this.state)
      })
  }

  onSubmit(e) {
    e.preventDefault()
    // this.props.handleSubmit(this.state)
    // console.log('this.state in PUT', this.state)
    // console.log('slice', this.props.history.location.pathname.slice(17))
    // var form = new FormData()
    // form.append('address', this.state.address)
    fetch('/api/listings/update/' + this.props.history.location.pathname.slice(17), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    }).then((data) => {
      return data.json()
    }).then((data) => {
      // console.log('PUT return data', data)
      this.props.history.push('/listings')
    })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onAddMoreSelectChange(features) {
    this.setState({ features })
  }

  onFileUpload(url) {
    if (url) {
      const pictures = this.state.pictures.concat(url)
      this.setState({ pictures })
    }
  }


  render() {
    // console.log('inside update url', this.props.history.location.pathname.slice(17))
    return (
      <form
        onSubmit={this.onSubmit}
        className="columns"
      >
        <div className="column col-7">
          {FORM_FIELDS.map((field) => {
            const TagName = field.tagName ? field.tagName : 'input'
            return (
              <div
                key={field.name}
                className="form-group"
              >
                <label
                  className="form-label text-bold"
                  htmlFor={field.name}
                >
                  {field.label}
                </label>
                <TagName
                  id={field.name}
                   type={field.type}
                  name={field.name}
                  value={this.state[field.name]}
                  className="form-input"
                  onChange={this.onChange}
                  placeholder={field.placeholder}
                  {...Object.assign(
                    {},
                    TagName === 'textarea' && { rows: 3 },
                  )}
                />
              </div>
            )
          })}
          <ImageUpload onUploadSuccess={this.onFileUpload} />
          <AddMoreSelect onChange={this.onAddMoreSelectChange} />
          <input
            className="btn btn-primary btn-lg"
            type="submit"
            value="Update"
          />
        </div>
        <div className="column col-5">
          <ListingPreview {...this.state} />
        </div>
      </form>
    )
  }
}

ListingsCreate.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit: (listing) => {
      dispatch(listingsCreateAsync(listing))
        .then((data) => {
          ownProps.history.push(`${listingsShowRoute(data._id)}`)
        })
    },
  }
}

export default connect(null, mapDispatchToProps)(ListingsCreate)
