import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import SelectYear from "./SelectYear";
import "../styles/Select.css";

class SelectTeam extends Component {
  state = { value: 1, schools: null };
  componentDidMount() {}
  componentDidUpdate(pP) {
    const { schools } = this.props;
    if (pP.schools !== this.props.schools) {
      const menuItemSchools = schools.map((currentSchool, i) => {
        const { school_name } = currentSchool;
        return (
          <MenuItem key={i} value={school_name}>
            {school_name}
          </MenuItem>
        );
      });
      this.setState({ schools: menuItemSchools });
    }
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { handleChange } = this;
    const { schools, value } = this.state;
    return (
      <div className="example">
        <Select
          className="team_select"
          name="value"
          onChange={handleChange}
          value={value}
          autoWidth={false}
        >
          <MenuItem value={1} disabled>
            Select Team
          </MenuItem>
          {schools}
        </Select>
        <SelectYear currentTeam={value} />
      </div>
    );
  }
}

let mapStateToProps = state => state.teams;

export default connect(mapStateToProps)(SelectTeam);
