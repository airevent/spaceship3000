//

"use strict"

import * as ids from "./sensorIds"

export default {
    [ids.AIR_PRESSURE]: {
        default: 760,
        min: 0,
        max: 3000,
        title: "Air pressure",
        lowFactor: .2,
        highFactor: .8,
        suffix: "mmHg",
    },
    [ids.OXYGEN_LEVEL]: {
        default: 20.95,
        min: 0,
        max: 100,
        title: "Oxygen",
        lowFactor: .2,
        highFactor: .8,
        suffix: "%",
    },
    [ids.WATER]: {
        default: 20,
        min: 0,
        max: 400,
        title: "Water",
        lowFactor: .2,
        highFactor: .8,
        suffix: "litres",
    },
}
