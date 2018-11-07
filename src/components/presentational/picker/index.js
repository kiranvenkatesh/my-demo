import React from 'react'
import { TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
})

const DateRange = props => {
  const { to, from, classes } = props
  return (
    <form className={classes.container} noValidate>
      <TextField
        id="datetime-local"
        label="From"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
      />
      <TextField
        id="datetime-local"
        label="To"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
      />
    </form>
  )
}

const MemoizedDateRange = React.memo(DateRange)
export default withStyles(styles, { withTheme: true })(MemoizedDateRange)
