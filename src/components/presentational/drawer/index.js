import React, { Fragment } from 'react'
import { IconButton, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles'
import AvTimer from '@material-ui/icons/AvTimer'
import Settings from '@material-ui/icons/Settings'

import styles from '../../../styles'

const linkStyle = {
  textDecoration: 'none',
  textAlign: 'center',
  marginTop: 10,
  marginBottom: 10
}

const Button = ({ children, active, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    {children}
    <Typography variant="button" color={active ? 'secondary' : 'default'}>
      {label}
    </Typography>
  </div>
)

const NavLinks = props => {
  const { classes, location } = props
  const { pathname } = location
  return (
    <Fragment>
      <Link to="/benchmark/bots" replace style={linkStyle}>
        <IconButton
          color={
            pathname.indexOf('benchmark') !== -1 || pathname === '/'
              ? 'secondary'
              : 'default'
          }
          style={{ backgroundColor: 'transparent' }}>
          <Button
            active={pathname.indexOf('benchmark') !== -1 || pathname === '/'}
            label="BenchMark">
            <AvTimer className={classes.drawerIcon} />
          </Button>
        </IconButton>
      </Link>
      <Link to="/business" replace style={linkStyle}>
        <IconButton
          color={pathname === '/business' ? 'secondary' : 'default'}
          style={{ backgroundColor: 'transparent' }}>
          <Button active={pathname === '/business'} label="Business">
            <Settings className={classes.drawerIcon} />
          </Button>
        </IconButton>
      </Link>
    </Fragment>
  )
}

const MemoizedNavLinks = React.memo(NavLinks)
export default withStyles(styles, { withTheme: true })(
  withRouter(React.memo(MemoizedNavLinks))
)
