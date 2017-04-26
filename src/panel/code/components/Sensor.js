//

"use strict"

import React from "react"

export default class extends React.Component {
    render() {
        let valueClasses = ["value"]

        let scale = this.props.conf.max - this.props.conf.min

        if ( this.props.value <= this.props.conf.min ) {
            valueClasses.push("min")
        } else if ( this.props.value < this.props.conf.min + scale * this.props.conf.lowFactor ) {
            valueClasses.push("low")
        } else if ( this.props.value < this.props.conf.min + scale * this.props.conf.highFactor ) {
            valueClasses.push("normal")
        } else if ( this.props.value < this.props.conf.max ) {
            valueClasses.push("high")
        } else {
            valueClasses.push("max")
        }

        return <div className="Sensor">
            <span className="title">{this.props.conf.title}:</span>
            <span className={valueClasses.join(" ")}>{this.props.value}</span>
            <span className="suffix">{this.props.conf.suffix}</span>
        </div>
    }
}
