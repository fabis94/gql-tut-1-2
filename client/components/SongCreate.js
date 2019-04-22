import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";
import fetchSongsQuery from "../queries/fetchSongs";

class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "" };
  }

  onSubmit(e) {
    e.preventDefault();

    this.props
      .mutate({
        variables: {
          title: this.state.title
        },
        refetchQueries: [{ query: fetchSongsQuery }]
      })
      .then(() => hashHistory.push("/"));
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a new song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song title:</label>
          <input
            onChange={e => this.setState({ title: e.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
