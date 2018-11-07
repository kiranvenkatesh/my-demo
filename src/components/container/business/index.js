import React, { Component } from 'react'
import { Typography } from '@material-ui/core'

class BusinessInfo extends Component {
  state = {
    loading: true
  }

  render() {
    const { loading } = this.state
    return (
      <Typography variant="headline">
        {loading ? 'Company Profile' : ''}
      </Typography>
    )
  }
}

export default BusinessInfo
