import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import SelectYear from "./SelectYear";
import "../styles/Select.css";

class SelectTeam extends Component {
  state = { value: 1, schools: [], awaitedSchools: [] };
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
      this.setState({
        //does this work?
        //yes it works
        //hahaha
        awaitedSchools: menuItemSchools.slice(0, 25),
        schools: menuItemSchools
      });
    }
  }
  handleChange = event => {
    const { update } = this.props;
    update(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { handleChange } = this;
    const { awaitedSchools, schools, value } = this.state;
    const { type } = this.props;
    return (
      <div className="example">
        <Select
          className="team_select"
          name="value"
          onChange={handleChange}
          value={value}
          autoWidth={false}
          onClick={() =>
            setTimeout(() => this.setState({ awaitedSchools: schools }), 1)
          }
          onBlurCapture={() => {
            this.setState({ awaitedSchools: schools.slice(0, 25) });
          }}
        >
          <MenuItem value={1} disabled>
            Select Team
          </MenuItem>
          {awaitedSchools}
        </Select>
        <SelectYear currentTeam={value} type={type} />
      </div>
    );
  }
}

let mapStateToProps = state => state.teams;

export default connect(mapStateToProps)(SelectTeam);
