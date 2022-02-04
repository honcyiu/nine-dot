import React from "react";

export default class TaskStimulus extends React.Component {
  render() {
    const { round, stage, player } = this.props;

    return (
      <div className="task-stimulus">
        <p>Please try to connect the dots with indicated number of connected straight lines.</p>
        <p>A green dot shows that the dot has been connected, while a red one shows it has not.</p>
        <p>Press "Done!" to save your result, and the "Submit" to move to the next round.</p>
      </div>
    );
  }
}
