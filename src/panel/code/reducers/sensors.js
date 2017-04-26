//

"use strict"

import * as actions from "../constants/actions"
import conf from "../constants/sensorConf"

let sensors = {}

for ( let type in conf ) {
    sensors[type] = conf[type].default
}

const initialState = sensors

export default function reducer(state = initialState, action) {
    switch ( action.type ) {
        case actions.SENSOR_SET_VALUE:
            return Object.assign({}, state, {
                [action.payload.sensorId]: action.payload.value,
            })
        default:
            return state
    }
}
