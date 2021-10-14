//Project: A Robot
//Solutions from book, did not finish this one


const {routeRobot, goalOrientedRobot, VillageState, findRoute } = require('../filesFromBook/07_robot.js');

function countSteps(state, robot, memory) {
  for (let steps = 0; ; steps++) {
    if (state.parcels.length == 0) return steps;
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
  }
}

function compareRobots(robot1, memory1, robot2, memory2) {
  let total1 = 0,
    total2 = 0;
  for (let i = 0; i < 100; i++) {
    let state = VillageState.random();
    total1 += countSteps(state, robot1, memory1);
    total2 += countSteps(state, robot2, memory2);
  }
  console.log(`Robot 1 needed ${total1 / 100} steps per task`);
  console.log(`Robot 2 needed ${total2 / 100}`);
}

/* compareRobots(routeRobot, [], goalOrientedRobot, []);
 */
//
function lazyRobot({ place, parcels }, route) {
  if (route.length == 0) {
    // Describe a route for every parcel
    let routes = parcels.map((parcel) => {
      if (parcel.place != place) {
        return {
          route: findRoute(roadGraph, place, parcel.place),
          pickUp: true,
        };
      } else {
        return {
          route: findRoute(roadGraph, place, parcel.address),
          pickUp: false,
        };
      }
    });

    // This determines the precedence a route gets when choosing.
    // Route length counts negatively, routes that pick up a package
    // get a small bonus.
    function score({ route, pickUp }) {
      return (pickUp ? 0.5 : 0) - route.length;
    }
    route = routes.reduce((a, b) => (score(a) > score(b) ? a : b)).route;
  }

  return { direction: route[0], memory: route.slice(1) };
}

/* runRobot(VillageState.random(), lazyRobot, []);
 */



//Persitent Group
//My solution
class PGroup {
  constructor(values) {
    this.values = values || [];
  }
  static empty = new PGroup();

  add(value) {
    if (!this.values.includes(value)) {
      return new PGroup([...this.values, value]);
    }
  }
  delete(value) {
    return new PGroup(this.values.filter((val) => val !== value));
  }

  has(value) {
    return this.values.includes(value);
  }
}

//Solution in book
/* class PGroup {
  constructor(members) {
    this.members = members;
  }

  add(value) {
    if (this.has(value)) return this;
    return new PGroup(this.members.concat([value]));
  }

  delete(value) {
    if (!this.has(value)) return this;
    return new PGroup(this.members.filter((m) => m !== value));
  }

  has(value) {
    return this.members.includes(value);
  }
}

PGroup.empty = new PGroup([]); */

module.exports = { PGroup };