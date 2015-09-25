import React from 'react';

import { GamePlayerStatusText, GamePlayerStatusMessage } from '../constants';

export default class GamePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { player: props.player };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ player: nextProps.player });
  }

  componentWillUnmount() {
  }

  render() {
    const player = this.state.player;

    return (<div className="grid__4">
      <div className="card game-player">
        <div className="game-player__name"><strong>{player.name}</strong> - {player.score}</div>
        <div className="game-player__status">{GamePlayerStatusText[player.state]}</div>
        <div className="game-player__message">{GamePlayerStatusMessage[player.state]}</div>
      </div>
    </div>);
  }
}
