//

"use strict"

import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import * as sensorActions from "../actions/sensor"
import sensorConf from "../constants/sensorConf"
import * as sensorIds from "../constants/sensorIds"
import Sensor from "../components/Sensor"

export default connect(state => {
    return {
        sensors: state.sensors,
    }
}, dispatch => {
    return {
        sensorActions: bindActionCreators(sensorActions, dispatch),
    }
})(class extends React.Component {
    /*componentDidMount() {
        setInterval(() => {
            this.props.sensorActions.setValue(sensorIds.WATER, Math.round(Math.random() * 400))
        }, 1000)
    }*/

    render() {
        let sensors = []

        for ( let sensorId in sensorConf ) {
            sensors.push(<Sensor
                key={sensorId}
                id={sensorId}
                value={this.props.sensors[sensorId]}
                conf={sensorConf[sensorId]}
            />)
        }

        return <div className="Stats">
            {sensors}
        </div>
    }
})
