// @flow

const {Entities} = require('../entities/registry');

const getModifiedCost = (game: Game, entityType: EntityType): Object => {
  const cost = {...Entities[entityType].config.cost};
  const numBuilding = game[entityType]
    .map(id => game.entities[id])
    .filter(e => e.playerID == game.playerID)
    .length;
  for (const resource in cost) {
    for (let i = 0; i < numBuilding; i++) {
      cost[resource] *= 2;
    }
  }
  return cost;
}

const canAffordBuilding = (game, cost: Cost): Boolean => {
  return game.money >= cost;
};

module.exports = {
  canAffordBuilding,
  getModifiedCost,
};
