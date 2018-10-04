import React, { Component } from "react";
import { connect } from "react-redux";
import { getSchools } from "../../ducks/teams";
import { updateLeft, updateRight } from "../../ducks/opponent";
import "./styles/BothTeams.css";
import EachTeam from "./EachTeam";
import Doughnut from "./DoughnutChart";

class BothTeams extends Component {
  componentDidMount() {
    this.props.getSchools();
  }
  render() {
    const { updateLeft, updateRight } = this.props;
    return (
      <div className="both_teams">
        <EachTeam type="leftOpponent" update={updateLeft} />
        <h2 className="both_teams__h2">VS</h2>
        <EachTeam type="rightOpponent" update={updateRight} />
        <section className="both_teams__chart">
          <Doughnut />
        </section>
      </div>
    );
  }
}

let mapStateToProps = state => state;
export default connect(
  mapStateToProps,
  { getSchools, updateLeft, updateRight }
)(BothTeams);
