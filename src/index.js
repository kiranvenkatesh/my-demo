/* eslint-env browser */

import React from "react"
import ReactDOM from "react-dom"
import Main from "./components/container/main"

const init = () => {
  const wrapper = document.getElementById("container")
  if (wrapper) {
    ReactDOM.render(<Main />, wrapper)
  }
}

init()
