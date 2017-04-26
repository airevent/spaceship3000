//

"use strict"

import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import App from "./containers/App"
import initStore from "./store/initStore"

const ID = "Spaceship3000"
const store = initStore()

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById(ID))
