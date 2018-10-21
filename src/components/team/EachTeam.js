import React, { Component } from 'react';
import { connect } from 'react-redux';

import './assets/styles/EachTeam.css';

import SelectTeam from './select/SelectTeam';
import footballhelmet from './assets/icons/football-helmet.svg';

class EachTeam extends Component {
  state = {
    percent: 0,
    percentColor: 'black'
  };
  percentColorCoordinator = () => {
    const { type, opponent } = this.props;
    const { sherlockWinAlgo: leftSherlockWin } = opponent.leftOpponent;
    const { sherlockWinAlgo: rightSherlockWin } = opponent.rightOpponent;
    return type === 'leftOpponent' && leftSherlockWin > rightSherlockWin
      ? 'green'
      : type === 'rightOpponent' && leftSherlockWin < rightSherlockWin
        ? 'green'
        : type === 'leftOpponent' && leftSherlockWin < rightSherlockWin
          ? 'red'
          : type === 'rightOpponent' && leftSherlockWin > rightSherlockWin
            ? 'red'
            : null;
  };
  componentDidUpdate(pP) {
    const { type, opponent } = this.props;
    const { sherlockWinAlgo: leftWinAlgo } = opponent.leftOpponent;
    const { sherlockWinAlgo: rightWinAlgo } = opponent.rightOpponent;
    var amount = 0;
    const total = leftWinAlgo + rightWinAlgo;
    const newColor = this.percentColorCoordinator();
    if (pP.opponent !== opponent) {
      if (total === 0) {
        return;
      } else if (type === 'rightOpponent' && rightWinAlgo > leftWinAlgo) {
        let percent = (rightWinAlgo / total) * 100;
        amount = Math.ceil(percent);
      } else if (type === 'rightOpponent' && rightWinAlgo < leftWinAlgo) {
        let percent = (rightWinAlgo / total) * 100;
        amount = Math.floor(percent);
      } else if (type === 'leftOpponent' && leftWinAlgo > rightWinAlgo) {
        let percent = (leftWinAlgo / total) * 100;
        amount = Math.ceil(percent);
      } else if (type === 'leftOpponent' && leftWinAlgo < rightWinAlgo) {
        let percent = (leftWinAlgo / total) * 100;
        amount = Math.floor(percent);
      }
      console.log(newColor);
      this.setState({
        percent: amount,
        percentColor: newColor
      });
    }
  }
  render() {
    const { percent, percentColor } = this.state,
      { update, type, opponent } = this.props,
      { currentStats } = opponent[type],
      { sherlockWinAlgo: leftSherlockWin } = this.props.opponent.leftOpponent,
      { sherlockWinAlgo: rightSherlockWin } = this.props.opponent.rightOpponent;

    return (
      <div
        className="each_team"
        style={{
          alignItems: type === 'leftOpponent' ? 'flex-end' : 'flex-start'
        }}
      >
        {/* <header
          className="each_team__background_image"
          style={{
            backgroundImage: `url(${
              type === "leftOpponent"
                ? this.props.opponent.leftOpponent.currentLogo
                : this.props.opponent.rightOpponent.currentLogo
            })`
          }}
        /> */}
        <SelectTeam update={update} type={type} />
        <section
          id={
            type === 'leftOpponent'
              ? 'each_team__left-helmet'
              : 'each_team__right-helmet'
          }
        >
          <img src={footballhelmet} width="70" height="70" />
        </section>
        {/* <img
          src={
            type === "leftOpponent"
              ? this.props.opponent.leftOpponent.currentLogo
              : this.props.opponent.rightOpponent.currentLogo
          }
        /> */}

        <section>
          <div>
            <h3 style={{ borderBottomColor: percentColor }}>W</h3>
            <h3>{currentStats.year_wins ? currentStats.year_wins : 0}</h3>
          </div>

          <div>
            <h3 style={{ borderBottomColor: percentColor }}>L</h3>
            <h3>{currentStats.year_losses ? currentStats.year_losses : 0}</h3>
          </div>

          <div>
            <h3 style={{ borderBottomColor: percentColor }}>T</h3>
            <h3>{currentStats.year_ties ? currentStats.year_ties : 0}</h3>
          </div>
        </section>
        <div className="each_team__details">
          <h2 style={{ borderBottomColor: percentColor }}>Coach</h2>
          <h2>{currentStats.coaches ? currentStats.coaches : 'Select Team'}</h2>
        </div>
        <div className="each_team__details">
          <h2 style={{ borderBottomColor: percentColor }}>Conference</h2>
          <h2>{currentStats.conf_id ? currentStats.conf_id : 'Select Team'}</h2>
        </div>

        <footer>
          <h2 style={{ color: percentColor }}>{percent}%</h2>
        </footer>
      </div>
    );
  }
}
let mapStateToProps = state => state;
export default connect(mapStateToProps)(EachTeam);
