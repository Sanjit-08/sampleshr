import React from "react";

const StatusBar = () => {
  return (
    <div className="statusbox">
      <div className="statusbar">
        <div className="statusbar__options">
          <div class="statusbar__status">
            Shortlisted Candidate{" "}
            <span className="statusbar__number statusbar__number--shortlist">
              17
            </span>
          </div>
          <div class="statusbar__status">
            Hired{" "}
            <span className="statusbar__number statusbar__number--hired">
              10
            </span>
          </div>
          <div class="statusbar__status">
            Contacted{" "}
            <span className="statusbar__number statusbar__number--contacted">
              5
            </span>
          </div>
          <div class="statusbar__status">
            Rejected{" "}
            <span className="statusbar__number statusbar__number--rejected">
              11
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
