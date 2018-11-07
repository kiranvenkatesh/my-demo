import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { LinearProgress } from '@material-ui/core'

const domNode = document.getElementById('service-loader')

class ServiceLoader extends Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount() {
    domNode.appendChild(this.el)
  }

  componentWillUnmount() {
    domNode.removeChild(this.el)
  }

  render() {
    return ReactDOM.createPortal(
      <div
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          zIndex: 10
        }}>
        <LinearProgress color="secondary" />
      </div>,
      this.el
    )
  }
}

export default ServiceLoader
