import React from "react";
import NineDots from "./NineDots";
import nineDotPattern from "./Patterns/nine-dot"
import dotTurnPattern from "./Patterns/dot-turn"
import nonDotTurnPattern from "./Patterns/non-dot-turn"

patterns = [nonDotTurnPattern, dotTurnPattern, nineDotPattern]

export default class TaskResponse extends React.Component {
  handleCallback = (result) => {
    player.round.set("value", result.complete);
    player.round.set("lines", result.lines);
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.player.stage.submit();
  };

  renderSubmitted() {
    return (
      <div className="task-response">
        <div className="response-submitted">
          <h5>Waiting on other players...</h5>
          Please wait until all players are ready
        </div>
      </div>
    );
  }

  renderDots() {
    const { round } = this.props;
    return (
      <NineDots parentCallback={this.handleCallback} pattern={patterns[round.index]} />
    );
  }

  render() {
    const { player } = this.props;

    // If the player already submitted, don't show the slider or submit button
    if (player.stage.submitted) {
      return this.renderSubmitted();
    }

    return (
      <div className="task-response">
        <form onSubmit={this.handleSubmit}>
          {this.renderDots()}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
