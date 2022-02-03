import React from "react";
import PeerLines from "./PeerLines"

export default class SocialExposure extends React.Component {
  handleNext = event => {
    event.preventDefault();
    this.props.player.stage.submit();
  };

  renderSocialInteraction(otherPlayer) {
    // Get the value or return NA if no value was entered
    let value = otherPlayer.round.get("value") ?? "Not attempted";
    if (value == 1) {
      value = "Succeeded"
    }
    else if (value == 0) {
      value = "Failed"
    }

    let lines = otherPlayer.round.get("lines") ?? "NA";
    return (
      <div>
        <div className="alter" key={otherPlayer._id}>
          <img src={otherPlayer.get("avatar")} className="profile-avatar" />
        </div>
        <p>Result: {value}</p>
        {
          (lines.length > 0 && lines[0].roughElement) ?
            (<PeerLines lines={lines} />) :
            <p>No lines were drawn</p>
        }
      </div>
    );
  }

  renderNext() {
    return (
      <div className="task-response">
        <div className="response-submitted">
          <h5>Waiting on other players...</h5>
          Please wait until all players are ready
        </div>
      </div>
    );
  }

  render() {
    const { game, player } = this.props;

    if (player.stage.submitted) {
      return this.renderNext();
    }

    const otherPlayers = game.players.filter(p =>
      player.get("neighbors").includes(p.get("nodeId"))
    );

    // if there are no other players, there are no social rounds to the game
    if (otherPlayers.length === 0) {
      this.props.player.stage.submit();
    }

    return (
      <div className="social-exposure">
        <h3 className="title">Social Information</h3>
        <p className="title">
          {
            otherPlayers.length > 1
              ? <strong>There are {otherPlayers.length} other players:</strong>
              : <strong>There is one other player:</strong>
          }
        </p>

        {otherPlayers.map(p => this.renderSocialInteraction(p))}
        <button type="submit" onClick={this.handleNext}>Next Round</button>
      </div>
    );
  }
}