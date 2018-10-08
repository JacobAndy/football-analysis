import React, { Component } from "react";
import { connect } from "react-redux";
// import * as d3 from "d3";
import { Doughnut } from "react-chartjs-2";
import "./styles/Doughnut.css";

class DoughnutChart extends Component {
  state = {
    data: {
      labels: ["select", "select"],
      datasets: [
        {
          data: [50, 50],
          backgroundColor: ["blue", "red"],
          hoverBackgroundColor: ["blue", "red"]
        }
      ]
    }
  };
  componentDidUpdate(pP) {
    const { sherlockWinAlgo: leftSherlockAlgo } = this.props.leftOpponent,
      {
        school_name: leftSchoolName = "select"
      } = this.props.leftOpponent.currentStats,
      { sherlockWinAlgo: rightSherlockAlgo } = this.props.rightOpponent,
      {
        school_name: rightSchoolName = "select"
      } = this.props.rightOpponent.currentStats;

    const { sherlockWinAlgo: pPleftSherlockAlgo } = pP.leftOpponent,
      { sherlockWinAlgo: pPrightSherlockAlgo } = pP.rightOpponent;
    console.log(leftSchoolName, rightSchoolName);
    if (
      pPleftSherlockAlgo !== leftSherlockAlgo ||
      pPrightSherlockAlgo !== rightSherlockAlgo
    ) {
      this.setState({
        data: {
          labels: [leftSchoolName, rightSchoolName],
          datasets: [
            {
              ...this.state.data.datasets[0],
              data: [
                Math.floor(this.props.leftOpponent.sherlockWinAlgo),
                Math.floor(this.props.rightOpponent.sherlockWinAlgo)
              ]
            }
          ]
        }
      });
    }
  }
  render() {
    const { data } = this.state;
    const {
      school_name: rightSchoolName = "right team"
    } = this.props.rightOpponent;
    const {
      school_name: leftSchoolName = "left team"
    } = this.props.leftOpponent;
    return (
      <div className="doughnut">
        <Doughnut responsive={true} data={data} />
      </div>
    );
  }
}
let mapStateToProps = state => state.opponent;
export default connect(mapStateToProps)(DoughnutChart);
