import React from 'react';

import dispatcher from './dispatcher';
import gamesStore from './Models/Games';

import loadGames from './Actions/GameList';

export default class Browser extends React.Component {
  constructor() {
    super();
    this.state = { games: gamesStore.getGames() };
  }

  componentDidMount() {
    this._handleGames = () => this.setState({ games: gamesStore.getGames() });
    dispatcher.on('games', this._handleGames);

    loadGames();
  }

  componentWillUnmount() {
    dispatcher.off('games', this._handleGames);
  }

  renderControls() {
    return <div />;
  }
  renderGames() {
    if (this.state.games.length === 0) {
      return (<div className="card card--warning">
        No Games.
      </div>);
    }

    return (<div>
      {this.state.games.map(game => {
        return (<div className="card">
          Hosted by {game.host}
        </div>);
      })}
    </div>);
  }

  render() {
    return (<div>
      {this.renderControls()}
      {this.renderGames()}
    </div>);
  }
}
