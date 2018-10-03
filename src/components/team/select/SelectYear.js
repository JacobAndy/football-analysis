import React, { Component } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { schoolDetails } from "../../../dummyData";
import "../styles/Select.css";

class SelectYear extends Component {
  state = {
    currentYear: 1,
    years: null
  };
  componentDidMount() {
    //need to make xml request to the team
    //that is passed through props
    //then map through to create MenuItems
    const years = schoolDetails.map(currentYear => {
      const { year_id } = currentYear;
      return (
        <MenuItem key={year_id} value={year_id}>
          {year_id}
        </MenuItem>
      );
    });
    this.setState({ years });
    // console.log(schoolDetails);
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    console.log(this.props, this.state);
    const { handleChange } = this;
    const { currentYear, years } = this.state;
    return (
      <Select
        className="team_select"
        name="currentYear"
        onChange={handleChange}
        value={currentYear}
        style={{ borderBottom: "green" }}
      >
        <MenuItem value={1} disabled>
          Select Year
        </MenuItem>
        {years}
      </Select>
    );
  }
}
export default SelectYear;
