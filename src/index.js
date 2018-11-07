/* eslint-env browser */

import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { SnackbarProvider } from 'notistack'
import Main from './components/container/main'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#666666'
    },
    secondary: {
      main: '#ffbc03'
    }
  },
  typography: {
    useNextVariants: true
  }
})

const init = () => {
  const wrapper = document.getElementById('container')
  if (wrapper) {
    ReactDOM.render(
      <MuiThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={7}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          autoHideDuration={2500}>
          <Main />
        </SnackbarProvider>
      </MuiThemeProvider>,
      wrapper
    )
  }
}

init()
