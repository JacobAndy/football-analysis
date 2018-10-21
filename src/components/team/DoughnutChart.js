import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as d3 from "d3";
import { Doughnut } from 'react-chartjs-2';
import './assets/styles/Doughnut.css';

class DoughnutChart extends Component {
  state = {
    data: {
      labels: ['select', 'select'],
      datasets: [
        {
          data: [50, 50],
          backgroundColor: ['blue', 'red']
          // hoverBackgroundColor: ["blue", "red"]
        }
      ]
    }
  };
  componentDidUpdate(pP) {
    const { sherlockWinAlgo: leftSherlockAlgo } = this.props.leftOpponent,
      {
        school_name: leftSchoolName = 'select'
      } = this.props.leftOpponent.currentStats,
      { sherlockWinAlgo: rightSherlockAlgo } = this.props.rightOpponent,
      {
        school_name: rightSchoolName = 'select'
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
                Math.floor(leftSherlockAlgo),
                Math.floor(rightSherlockAlgo)
              ],
              backgroundColor:
                leftSherlockAlgo > rightSherlockAlgo
                  ? ['green', 'red']
                  : ['red', 'green']
            }
          ]
        }
      });
    }
  }
  render() {
    const { data } = this.state;
    const {
      sherlockWinAlgo: rightSherlockAlgo,
      currentLogo: rightLogo,
      school_name: rightSchoolName = 'right team'
    } = this.props.rightOpponent;
    const {
      sherlockWinAlgo: leftSherlockAlgo,
      currentLogo: leftLogo,
      school_name: leftSchoolName = 'left team'
    } = this.props.leftOpponent;
    return (
      <div
        className="doughnut"
        style={{
          backgroundImage: `url(${
            rightSherlockAlgo > leftSherlockAlgo ? rightLogo : leftLogo
          })`
        }}
      >
        <Doughnut
          options={{
            legend: {
              display: false
            }
          }}
          responsive={true}
          data={data}
        />
      </div>
    );
  }
}
let mapStateToProps = state => state.opponent;
export default connect(mapStateToProps)(DoughnutChart);
