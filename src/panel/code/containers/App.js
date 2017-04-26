//

"use strict"

import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import Stats from "./Stats"

export default connect(state => {
    return {
    }
}, dispatch => {
    return {
    }
})(class extends React.Component {
    render() {
        return <div className="App">
            <Stats />

            <div className="todo">
                <div className="border">
                    тут, например, может быть форма запуска..
                </div>
            </div>
        </div>
    }
})
