

import React, { Component } from "react";
import Battery from "./Battery";

export default class Playground extends Component {

  constructor(...args) {
    super(...args);

    this.state = { level: 0, charging: false };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { level, charging } }) {
    this.setState({ level, charging });
  }

  componentDidMount() {
    navigator.getBattery().then(bat => {
      this.battery = bat;
      this.battery.addEventListener("levelchange", this.handleChange);
      this.battery.addEventListener("chargingchange", this.handleChange);
      this.handleChange({ target: this.battery });
    });
  }

  componentWillUnmount() {
    this.battery.removeEventListener("levelchange", this.handleChange);
    this.battery.removeEventListener("chargingchange", this.handleChange);
  }


  render() {
    return (
      <section>
        <Battery {...this.state} />
      </section>
    );
  }
}
