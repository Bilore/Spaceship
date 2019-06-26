var utils = require('../lib/utils.js');
var logic = require('./../lib/codingpains-logic');

var Bilore = {
  info: {
    name: 'Bilore',
    style: 11
  },
  ai: function(player, enemies, map) {
    var armedEnemies = _.filter(enemies, (enemy) => enemy.ammo > 0);
 
    if (logic.inDanger(player, armedEnemies)) {
      return Bilore._eluder(player, armedEnemies, map);
    }

    var killers = logic.getImmediateThreats(player, enemies);
  
    
     var directionToAmmo;
  if (player.ammo >0) {
      if (utils.canKill(player, enemies) && player.ammo) {
    
      return 'shoot'
      }
    }
  
    if (map.ammoPosition.length) {
      var directionToAmmo = utils.getDirection(player.position, map.ammoPosition[0]); 
    
      if (directionToAmmo !== player.direction) {
        return directionToAmmo;
      }
      
      return "move"
    }
    if (player.ammo <0) {
      return utils.safeRandomMove();
    }
  
    if (enemies == player.position) {
      if (enemies.ammo >0) {
        return logic.goToCenter();
      }
    }
  
    if (player, enemies, map) {
      var killers = logic.getImmediateThreats(player, enemies);
    
      Bilore.info.mode = 'e';
    
      if (killers.length) {
        if (logic.canKill(player, killers)) {
          return 'shoot';
        } else if (logic.isMovementSafe('move', player, killers, map)) {
          return 'move';
        } else {
          return false;
        }
      }
    }
  
    return utils.safeRandomMove();
  
  },
  _eluder: (player, enemies, map) => {
  
    return "move"
  }
}


module.exports = Bilore;