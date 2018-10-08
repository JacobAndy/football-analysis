import React, { Component } from "react";
import { connect } from "react-redux";

import "./styles/EachTeam.css";

import SelectTeam from "./select/SelectTeam";

class EachTeam extends Component {
  state = {
    percent: 0
  };
  componentDidUpdate(pP) {
    const { type, opponent } = this.props;
    const { sherlockWinAlgo: leftWinAlgo } = opponent.leftOpponent;
    const { sherlockWinAlgo: rightWinAlgo } = opponent.rightOpponent;
    var amount = 0;
    const total = leftWinAlgo + rightWinAlgo;
    if (pP.opponent !== opponent) {
      if (total === 0) {
        return;
      } else if (type === "rightOpponent" && rightWinAlgo > leftWinAlgo) {
        let percent = (rightWinAlgo / total) * 100;
        amount = Math.ceil(percent);
      } else if (type === "rightOpponent" && rightWinAlgo < leftWinAlgo) {
        let percent = (rightWinAlgo / total) * 100;
        amount = Math.floor(percent);
      } else if (type === "leftOpponent" && leftWinAlgo > rightWinAlgo) {
        let percent = (leftWinAlgo / total) * 100;
        amount = Math.ceil(percent);
      } else if (type === "leftOpponent" && leftWinAlgo < rightWinAlgo) {
        let percent = (leftWinAlgo / total) * 100;
        amount = Math.floor(percent);
      }
      this.setState({ percent: amount });
    }
  }
  render() {
    const { percent } = this.state;
    const { update, type, opponent } = this.props;
    const { currentStats } = opponent[type];
    console.log(this.props.opponent);
    return (
      <div className="each_team">
        <header
          className="each_team__background_image"
          // style={{
          //   backgroundImage: `url(${
          //     type === "leftOpponent"
          //       ? this.props.opponent.leftOpponent.currentLogo
          //       : this.props.opponent.rightOpponent.currentLogo
          //   })`
          // }}
        />
        <SelectTeam update={update} type={type} />

        <img
          src={
            type === "leftOpponent"
              ? this.props.opponent.leftOpponent.currentLogo
              : this.props.opponent.rightOpponent.currentLogo
          }
        />

        <section>
          <div>
            <h3>W</h3>
            <h3>{currentStats.year_wins ? currentStats.year_wins : 0}</h3>
          </div>

          <div>
            <h3>L</h3>
            <h3>{currentStats.year_losses ? currentStats.year_losses : 0}</h3>
          </div>

          <div>
            <h3>T</h3>
            <h3>{currentStats.year_ties ? currentStats.year_ties : 0}</h3>
          </div>
        </section>
        <div className="each_team__details">
          <h2>Coach</h2>
          <h2>{currentStats.coaches ? currentStats.coaches : "Select Team"}</h2>
        </div>
        <div className="each_team__details">
          <h2>Conference</h2>
          <h2>{currentStats.conf_id ? currentStats.conf_id : "Select Team"}</h2>
        </div>

        <footer>
          <h2>{percent}%</h2>
        </footer>
      </div>
    );
  }
}
let mapStateToProps = state => state;
export default connect(mapStateToProps)(EachTeam);
