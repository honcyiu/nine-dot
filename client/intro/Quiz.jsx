import React from "react";

import { Centered } from "meteor/empirica:core";

export default class Quiz extends React.Component {
  state = { first: "", confirm: "" };

  handleChange = event => {
    const el = event.currentTarget;
    this.setState({ [el.name]: el.value.trim().toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.first !== "y" || this.state.confirm !== "y") {
      alert("Incorrect! Read the instructions, and please try again.");
    } else {
      this.props.onNext();
    }
  };

  render() {
    const { hasPrev, hasNext, onNext, onPrev } = this.props;
    const { first, confirm } = this.state;
    return (
      <Centered>
        <div className="quiz">
          <h1> (Placeholder for Quiz) </h1>
          <form onSubmit={this.handleSubmit}>
            <p>
              <label htmlFor="first">Are you ready to start the game (y/n)?</label>
              <input
                type="text"
                dir="auto"
                id="first"
                name="first"
                placeholder="e.g. y"
                value={first}
                onChange={this.handleChange}
                autoComplete="off"
                required
              />
            </p>
            <p>
              <label htmlFor="confirm">
                Are you sure (y/n)?
              </label>
              <input
                type="text"
                dir="auto"
                id="confirm"
                name="confirm"
                placeholder="e.g. y"
                value={confirm}
                onChange={this.handleChange}
                autoComplete="off"
                required
              />
            </p>

            <p>
              <button type="button" onClick={onPrev} disabled={!hasPrev}>
                Back to instructions
              </button>
              <button type="submit">Submit</button>
            </p>
          </form>
        </div>
      </Centered>
    );
  }
}
