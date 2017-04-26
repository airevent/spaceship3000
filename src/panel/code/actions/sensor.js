//

"use strict"

import * as actions from "../constants/actions"

export function setValue(sensorId, value) {
    return {
        type: actions.SENSOR_SET_VALUE,
        payload: {
            sensorId,
            value,
        },
    }
}
