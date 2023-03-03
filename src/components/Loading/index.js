import React, { Component } from "react";


export default class Loading extends Component {

    render() {

        return (
            <div className={"loading " + (this.props.show ? 'open' : '')}>
                <div></div>
            </div>
        );
    }

}