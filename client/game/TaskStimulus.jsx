import React from "react";

export default class TaskStimulus extends React.Component {
  render() {
    const { round, stage, player } = this.props;

    return (
      <div className="task-stimulus">
        <p>Please try to connect the nine-dots with 4 connected straight lines.</p>
        <p>A green dot shows that the dot has been connected, while a red one shows it has not.</p>
        <p>Press the submit button when you are done.</p>
      </div>
    );
  }
}
