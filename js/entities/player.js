// @flow

const {makeEntity} = require('./makeEntity');
const {getAntSpriteAndOffset} = require('../selectors/sprites');
const {renderAgent} = require('../render/renderAgent');

const config = {
  hp: 60,
  damage: 1,
  width: 1,
  height: 1,
  maxHold: 1,
  age: 0,

  AGENT: true,
  LOADER: true,

  pickupTypes: [
    'FOOD', 'DIRT', 'TOKEN',
    'DYNAMITE', 'COAL', 'IRON', 'STEEL',
  ],
  blockingTypes: [
    'FOOD', 'DIRT', 'AGENT',
    'STONE', 'DOODAD', 'WORM',
    'TOKEN', 'DYNAMITE',
    'COAL', 'IRON', 'STEEL',
  ],

  // action params
  MOVE: {
    duration: 41 * 4,
    spriteOrder: [1, 2],
    maxFrameOffset: 2,
    frameStep: 2,
  },
  MAN: {
    duration: 41 * 4,
    spriteOrder: [1, 2],
    maxFrameOffset: 2,
    frameStep: 2,
  },
  UN_MAN: {
    duration: 41 * 4,
    spriteOrder: [1, 2],
    maxFrameOffset: 2,
    frameStep: 2,
  },
  MOVE_TURN: {
    duration: 41 * 5,
    spriteOrder: [1, 2],
    maxFrameOffset: 2,
    frameStep: 2,
  },
  PICKUP: {
    duration: 41 * 6,
    spriteOrder: [5, 6, 7],
  },
  PUTDOWN: {
    duration: 41 * 6,
    spriteOrder: [7, 6, 5],
  },
  TURN: {
    duration: 41 * 6,
    spriteOrder: [1, 2, 3, 4],
  },
  DIE: {
    duration: 41 * 2,
    spriteOrder: [8],
  },
};

const make = (
  game: Game, position: Vector, playerID: PlayerID,
): Player => {
  const player = {
    ...makeEntity(
      'PLAYER', position,
      config.width, config.height,
    ),
    ...config,
		playerID,
    prevHP: config.hp,
    prevHPAge: 0,
    holding: null,
    holdingIDs: [], // treat holding like a stack
    actions: [],

    // this frame offset allows iterating through spritesheets across
    // multiple actions (rn only used by queen ant doing one full walk
    // cycle across two MOVE actions)
    frameOffset: 0,
    timeOnMove: 0, // for turning in place
  };

  return player
};

const render = (ctx, game: Game, agent: Agent): void => {
  renderAgent(ctx, game, agent, spriteRenderFn);
}

const spriteRenderFn = (ctx, game, ant) => {
  const sprite = getAntSpriteAndOffset(game, ant);
  if (sprite.img != null) {
    ctx.drawImage(
      sprite.img, sprite.x, sprite.y, sprite.width, sprite.height,
      0, 0, ant.width, ant.height,
    );
  }
}

module.exports = {
  config, make, render,
};

