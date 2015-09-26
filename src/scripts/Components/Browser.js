import React from 'react';

import BrowserEntry from './BrowserEntry';

import dispatcher from '../dispatcher';
import gamesStore from '../Models/Games';
import createGame from '../Actions/CreateGame';
import loadGames from '../Actions/GameList';

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

  createGame(e) {
    e.preventDefault();

    createGame();
  }
  refreshList(e) {
    e.preventDefault();

    loadGames();
  }

  renderControls() {
    return (<div className="grid">
      <div className="grid__6 text--left">
        <a onClick={e => this.createGame(e)} className="card">Create</a>
      </div>
      <div className="grid__6 text--right">
        <a onClick={e => this.refreshList(e)} className="card">Refresh</a>
      </div>
    </div>);
  }
  renderGames() {
    if (this.state.games.length === 0) {
      return (<div className="card card--warning">
        No Games.
      </div>);
    }

    return (<div>
      {this.state.games.map(game => {
        return <BrowserEntry key={game.id} game={game} />;
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
