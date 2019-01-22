import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route /* Link */ } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton
} from '@material-ui/core'
// import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
// import AvTimer from '@material-ui/icons/AvTimer'
// import Settings from '@material-ui/icons/Settings'

import BenchMark from './benchmark'
import BusinessInfo from './business'
import AccountPopover from '../presentational/accounts/account-popover'
import NavLinks from '../presentational/drawer'

import store from '../../store'
import styles from '../../styles'

class MiniDrawer extends React.Component {
  state = {
    open: false
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes, theme } = this.props
    const { open } = this.state

    return (
      <Provider store={store}>
        <Router>
          <div className={classes.root}>
            <AppBar
              position="absolute"
              className={classNames(
                classes.appBar,
                open && classes.appBarShift
              )}>
              <Toolbar disableGutters={!open}>
                <Typography variant="title" color="inherit" noWrap>
                  DEMO PROJECT
                </Typography>
                <AccountPopover />
                <AccountPopover />
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              classes={{
                paper: classNames(
                  classes.drawerPaper
                  // !open && classes.drawerPaperClose
                )
              }}
              open={open}>
              <div className={classes.toolbar}>
                <Typography variant="headline" />
                <IconButton onClick={this.handleDrawerClose}>
                  {theme.direction === 'rtl' ? (
                    <ChevronRightIcon />
                  ) : (
                    <ChevronLeftIcon />
                  )}
                </IconButton>
              </div>
              <Divider />
              <NavLinks />
            </Drawer>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <div>
                <Route path="/" exact component={BenchMark} />
                <Route path="/business" exact component={BusinessInfo} />
                <Route
                  path="/benchmark/:type(bots|runners|creators)"
                  component={BenchMark}
                />
              </div>
            </main>
          </div>
        </Router>
      </Provider>
    )
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  theme: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
}

export default withStyles(styles, { withTheme: true })(MiniDrawer)
