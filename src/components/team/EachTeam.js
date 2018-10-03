import React, { Component } from "react";
import "./styles/EachTeam.css";
import SelectTeam from "./select/SelectTeam";
import axios from "axios";

class EachTeam extends Component {
  state = {};
  componentDidMount() {}
  render() {
    return (
      <div className="each_team">
        <header
          className="each_team__background_image"
          style={{
            backgroundImage: `url("https://d2p3bygnnzw9w3.cloudfront.net/req/201809211/tlogo/ncaa/bowling-green-state.png")`
          }}
        />

        <SelectTeam />
        <div className="each_team__details">
          <h2>Coach</h2>
          <h2>Coach Name Goes Here</h2>
        </div>
        <div className="each_team__details">
          <h2>Conference</h2>
          <h2>Conference Goes Here</h2>
        </div>
        <section>
          <div>
            <h3>W</h3>
            <h3>1</h3>
          </div>

          <div>
            <h3>L</h3>
            <h3>1</h3>
          </div>

          <div>
            <h3>T</h3>
            <h3>1</h3>
          </div>
        </section>
        <footer>
          <h2>50%</h2>
        </footer>
      </div>
    );
  }
}
export default EachTeam;
