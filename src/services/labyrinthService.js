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
  return labyrinths(user).then(libs => libs.map(lib => lib._id));
});

const findLabyrinthById = ((user, stateId) => {
  return labyrinths(user).then( data => {
    if (data.length === 0) {
      return "Data not found";
    }
    let  type;
    data.forEach(item => {
      item.playfield.forEach( state => {
        if(state._id == stateId) {
          type =  state.type;
        }
      });
    });

    return type || "Id not found.";
  }).catch( err => {
    return  new Promise({ error: err });
  })
});

const labyrinthSolution = ((id) => {
  return labyrinths(null, id).then( data => {
    return solveMaze(data[0]).then( solution => {
      return solution;
    })
  }).catch(err => {
    return { error: err };
  });
});

const createLabyrinth = ((user) => {
  const labyrinth = new Labyrinth({ owner: user });
  return labyrinth.save();
});

const updateLabyrinthType = ((id, x, y, type) => {
  return labyrinths(null, id).then( data => {
    let newData = data[0].playfield.filter( item => {
      if ((Number(item.x) === Number(x)) && ((Number(item.y) === Number(y)))) {
        return false;
      }
      return true;
    });
    data[0].playfield = newData;
    data[0].playfield.push({ x:x, y:y, type:type });
    return data[0].save();
  }).catch(err => {
    return { error: err };
  });
});

const updateLabyrinthStart = ((id, x, y) => {
  return labyrinths(null, id).then( data => {
    data[0].start = { x:x, y:y };
    return data[0].save();
  }).catch(err => {
      return { error: err };
  });
});

const updateLabyrinthEnd = ((id, x, y) => {
  return labyrinths(null, id).then( data => {
    data[0].end = { x:x, y:y };
    return data[0].save();
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

