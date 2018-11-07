import React, { Component } from 'react'
import { CircularProgress } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import Bots from './bots'
import DateRange from '../../presentational/picker'

import styles from '../../../styles'

// const TabContainer = props => (
//   <div style={{ padding: 10 }}>
//     <Typography variant="title">{props.children}</Typography>
//   </div>
// )

class BenchMark extends Component {
  state = {
    value: 'bots',
    loading: true
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false })
    }, 1500)
  }

  handleChange = (event, value) => {
    const { history, match } = this.props
    const { value: val } = this.state

    if (val === value) return

    this.setState(
      {
        value
      },
      () => {
        history.push(`${match.url}/${value}`)
      }
    )
  }

  render() {
    const { loading } = this.state
    const { classes } = this.props

    if (loading) {
      return (
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      )
    }

    return (
      <div>
        <DateRange />
        <Bots />
      </div>
    )
    // return (
    //   <div>
    //     <DateRange />
    //     <Tabs value={value} onChange={this.handleChange}>
    //       <Tab value="bots" label="Bots" />
    //       <Tab value="runners" label="Bot Runners" />
    //       <Tab value="creators" label="Bot Creators" />
    //     </Tabs>
    //     {value === 'bots' && (
    //       <TabContainer>
    //         <Bots />
    //       </TabContainer>
    //     )}
    //     {value === 'runners' && <TabContainer>Item Two</TabContainer>}
    //     {value === 'creators' && <TabContainer>Item Three</TabContainer>}
    //   </div>
    // )
  }
}

export default withStyles(styles, { withTheme: true })(BenchMark)
