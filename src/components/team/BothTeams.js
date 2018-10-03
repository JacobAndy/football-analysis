import React from "react";
import "./styles/BothTeams.css";
import EachTeam from "./EachTeam";

function BothTeams() {
  return (
    <div className="both_teams">
      <EachTeam />
      <EachTeam />
    </div>
  );
}
export default BothTeams;
