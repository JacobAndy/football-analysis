import React, { Component } from "react";
import * as d3 from "d3";
import "./styles/Doughnut.css";
var data = [
  { name: "USA", value: 50 },
  { name: "UK", value: 50 }
  // { name: "Canada", value: 30 },
  // { name: "Maxico", value: 10 }
];
var text = "";
class DoughnutChart extends Component {
  state = {};
  componentDidMount() {
    const width = 260,
      height = 260,
      thickness = 40,
      duration = 750;

    let radius = Math.min(width, height) / 2,
      color = d3.scaleOrdinal(d3.schemeCategory10),
      svg = d3
        .select(this.refs.doughnut)
        .attr("class", "pie")
        .attr("width", width)
        .attr("height", height),
      g = svg
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`),
      arc = d3
        .arc()
        .innerRadius(80)
        .outerRadius(radius),
      pie = d3
        .pie()
        .value(d => d.value)
        .sort(null),
      path = g
        .selectAll("path")
        .data(pie(data))
        .enter()
        .append("g")
        // .on("mouseover", function(d) {
        //   let g = d3
        //     .select(this)
        //     .style("cursor", "pointer")
        //     .style("fill", "black")
        //     .append("g")
        //     .attr("class", "text-group");

        //   g.append("text")
        //     .attr("class", "name-text")
        //     .text(`${d.data.name}`)
        //     .attr("text-anchor", "middle")
        //     .attr("dy", "-1.2em");

        //   g.append("text")
        //     .attr("class", "value-text")
        //     .text(`${d.data.value}`)
        //     .attr("text-anchor", "middle")
        //     .attr("dy", ".6em");
        // })
        // .on("mouseout", function(d) {
        //   d3.select(this)
        //     .style("cursor", "none")
        //     .style("fill", color(this._current))
        //     .select(".text-group")
        //     .remove();
        // })
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => color(i))
        .on("mouseover", function(d) {
          d3.select(this)
            .style("cursor", "pointer")
            .style("fill", "black");
        })
        .on("mouseout", function(d) {
          d3.select(this)
            .style("cursor", "none")
            .style("fill", color(this._current));
        })
        .each(function(d, i) {
          this._current = i;
        });

    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .text(text);
  }
  componentDidUpdate() {}
  render() {
    return (
      <div>
        <svg ref="doughnut">
          <text dy=".6em" text-anchor="middle" x="130" y="125">
            TEAM WHO WINS
          </text>
        </svg>
      </div>
    );
  }
}
export default DoughnutChart;
