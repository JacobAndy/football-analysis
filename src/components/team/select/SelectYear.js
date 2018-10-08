import React, { Component } from "react";
import { connect } from "react-redux";
import { currentStats } from "../../../ducks/opponent";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import "../styles/Select.css";

class SelectYear extends Component {
  state = {
    currentYear: 1,
    years: null
  };

  componentDidUpdate(pP) {
    if (
      this.props.type === "rightOpponent" &&
      pP.rightOpponent !== this.props.rightOpponent
    ) {
      //right opponent mapping
      const { currentTeam } = this.props.rightOpponent;
      const years = currentTeam.map(currentYear => {
        const { year_id } = currentYear;
        return (
          <MenuItem style={{ width: "100px" }} key={year_id} value={year_id}>
            {year_id}
          </MenuItem>
        );
      });
      this.setState({ years });
    } else if (
      this.props.type === "leftOpponent" &&
      pP.leftOpponent !== this.props.leftOpponent
    ) {
      //left opponent mapping
      const { currentTeam } = this.props.leftOpponent;
      const years = currentTeam.map(currentYear => {
        const { year_id } = currentYear;
        return (
          <MenuItem style={{ width: "100px" }} key={year_id} value={year_id}>
            {year_id}
          </MenuItem>
        );
      });
      this.setState({ years });
    }
  }
  handleChange = event => {
    //invoke redux function to find the current stats
    const { type, currentStats } = this.props;
    currentStats(type, event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { handleChange } = this;
    const { currentYear, years } = this.state;
    return (
      // <div className="example">
      <Select
        className="year_select"
        name="currentYear"
        onChange={handleChange}
        value={currentYear}
        style={{ borderBottom: "green" }}
        autoWidth={false}
      >
        <MenuItem value={1} disabled>
          Year
        </MenuItem>
        {years}
      </Select>
      // </div>
    );
  }
}
let mapStateToProps = state => state.opponent;
export default connect(
  mapStateToProps,
  { currentStats }
)(SelectYear);
