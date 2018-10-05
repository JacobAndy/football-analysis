import React, { Component } from "react";
import { connect } from "react-redux";
// import * as d3 from "d3";
import { Doughnut } from "react-chartjs-2";
import "./styles/Doughnut.css";

class DoughnutChart extends Component {
  state = {};
  componentDidUpdate(pP) {}
  render() {
    const { data } = this.state;
    const {
      school_name: rightSchoolName = "right team"
    } = this.props.rightOpponent;
    const {
      school_name: leftSchoolName = "left team"
    } = this.props.leftOpponent;
    return (
      <div>
        <Doughnut
          data={{
            labels: [leftSchoolName, rightSchoolName],
            datasets: [
              {
                data: [
                  this.props.leftOpponent.sherlockWinAlgo,
                  this.props.rightOpponent.sherlockWinAlgo
                ],
                backgroundColor: ["#FF6384", "#36A2EB"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB"]
              }
            ]
          }}
        />
      </div>
    );
  }
}
let mapStateToProps = state => state.opponent;
export default connect(mapStateToProps)(DoughnutChart);
