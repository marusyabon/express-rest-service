const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskShema = new Schema({
  title: String,
  order: Number,
  description: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  boardId: { type: Schema.Types.ObjectId, ref: 'Board' },
  columnId: { type: Schema.Types.ObjectId, ref: 'Column' }
});

taskShema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
    ret.id = ret._id.toString();
    delete ret._id;
  }
});

module.exports = mongoose.model('Task', taskShema);
