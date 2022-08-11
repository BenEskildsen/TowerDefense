
const React = require('react');
const AudioWidget = require('./Components/AudioWidget.react');
const Button = require('./Components/Button.react');
const Divider = require('./Components/Divider.react');
const Modal = require('./Components/Modal.react');
const QuitButton = require('../ui/components/QuitButton.react');
const globalConfig = require('../config');
const {getDisplayTime, isElectron} = require('../utils/helpers');
const InfoCard = require('../ui/components/InfoCard.react');
const PlacementPalette = require('../ui/PlacementPalette.react');
const {memo} = React;
const {Entities} = require('../entities/registry');

function TopBar(props) {
  const {
    dispatch,
    placeType,
    game,
    base,
    isExperimental,
    tickInterval,
  } = props;

  if (isExperimental && tickInterval == null) return null;

  const height = 100;
  const topPadding = 8;
  const leftPadding = 4;
  let powerStuff = (
    <div>
    Money: {game.money}
    </div>
  );


  return (
    <div
      id="topBar"
      style={{
        position: 'absolute',
        top: topPadding,
        height,
        width: '100%',
        zIndex: 2,
        textShadow: '-1px -1px 0 #FFF, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          verticalAlign: 'top',
        }}
      >
        <PlacementPalette
          game={game}
          dispatch={dispatch}
          placeType={placeType}
        />
      </div>
      <div
        style={{
          // left: leftPadding,
          width: 200,
          marginLeft: 10,
          display: 'inline-block',
          // position: 'absolute',
        }}
      >
        {powerStuff}
      </div>
      <div
        style={{
          width: 200,
          marginLeft: 10,
          fontSize: '1.5em',
          display: 'inline-block',
        }}
      >
        <b>Missiles Survived</b>: {0}
      </div>
    </div>
  );
}


module.exports = TopBar;
