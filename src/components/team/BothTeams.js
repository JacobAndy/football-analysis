import React from "react";
import "./styles/BothTeams.css";
import EachTeam from "./EachTeam";
import Doughnut from "./DoughnutChart";

function BothTeams() {
  return (
    <div className="both_teams">
      <EachTeam />
      <h2 className="both_teams__h2">VS</h2>
      <EachTeam />
      <section className="both_teams__chart">
        <Doughnut />
      </section>
    </div>
  );
}

export default BothTeams;
