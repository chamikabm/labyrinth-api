import { solveMaze } from '../managers/MazeManager';
import { Labyrinth } from '../models';

const labyrinths = ( userId, labyrinth ) => {
  return new Promise((resolve, reject ) => {
    if(userId) {
      Labyrinth.find({ owner: userId })
        .exec((err, data) => {
          if(data) {
            resolve(data);
          } else if (err) {
            reject(err);
          } else {
            reject("not found");
          }
        });
    } else if(labyrinth) {
      Labyrinth.find({ _id: labyrinth })
        .exec((err, data) => {
          if(data) {
            resolve(data);
          } else if (err) {
            reject(err);
          } else {
            reject("not found");
          }
        });
    }
  });
};

const findLabyrinths = ((user) => {
  labyrinths(user).then( data => {
    return data;
  }).catch( err => {
    return { error: err };
  })
});

const findLabyrinthById = ((user, stateId) => {
  labyrinths(user).then( data => {
    data.forEach(item => {
      item.playfield.forEach( state => {
        if(state._id == stateId) {
          return state.type;
        } else {
          return "id not found";
        }
      });
    })
  }).catch( err => {
    return { error: err };
  })
});

const labyrinthSolution = ((id) => {
  labyrinths(null, id).then( data => {
    solveMaze(data[0]).then( solution => {
      return solution;
    })
  }).catch(err => {
    return { error: err };
  });
});

const createLabyrinth = ((user) => {
  let labyrinth = new Labyrinth({ owner: user });
  labyrinth.save( (err, data) => {
    if (err) {
      return { error: err };
    } else {
      return data._id;
    }
  });
});

const updateLabyrinthType = ((id, x, y, type) => {
  labyrinths(null, id).then( data => {
    let newData = data[0].playfield.filter( item => {
      if ((Number(item.x) === Number(x)) && ((Number(item.y) === Number(y)))) {
        return false;
      }
      return true;
    });
    data[0].playfield = newData;
    data[0].playfield.push({ x:x, y:y, type:type });
    data[0].save(err => {
      if(err) {
        console.log(err)
      } else {
        return "data updated";
      }
    });
  }).catch(err => {
    return { error: err };
  });
});

const updateLabyrinthStart = ((id, x, y) => {
  labyrinths(null, id).then( data => {
    data[0].start = { x:x, y:y };
    data[0].save(err => {
      if(err) {
        console.log(err)
      } else {
        return "data updated";
      }
    })
  }).catch(err => {
      return { error: err };
  });
});

const updateLabyrinthEnd = ((id, x, y) => {
  labyrinths(null, id).then( data => {
    data[0].end = { x:x, y:y };
    data[0].save(err => {
      if(err) {
        console.log(err)
      } else {
        return "data updated";
      }
    })
  }).catch(err => {
    return { error: err };
  });
});

export {
  findLabyrinths,
  findLabyrinthById,
  labyrinthSolution,
  createLabyrinth,
  updateLabyrinthType,
  updateLabyrinthStart,
  updateLabyrinthEnd,
}

