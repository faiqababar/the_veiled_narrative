import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

const Progress = () => {
  return (
    <div style={{ backgroundColor: "#d3d3d3", overflow: "hidden" }}>
      <ProgressBar
        style={{ height: 3, background: "#d3d3d3" }}
        now={75}
        className="progressBar"
      />
    </div>
  );
};

export default Progress;
