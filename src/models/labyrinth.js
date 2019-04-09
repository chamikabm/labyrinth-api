import mongoose from 'mongoose';

const labyrinthSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  start: [{ x: { type: Number }, y: { type: Number } }],
  end: [{ x: { type: Number }, y: { type: Number } }],
  playfield: [{ x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    type: { type: String, enum: ['empty', 'blocked'] }
  }]
});

const Labyrinth = mongoose.model('Labyrinth', labyrinthSchema);

export default Labyrinth;
