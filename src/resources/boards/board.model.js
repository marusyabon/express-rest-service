const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const columnsSchema = new Schema({
  title: String,
  order: Number
});
mongoose.model('Column', columnsSchema);

const boardSchema = new Schema({
  title: String,
  columns: [columnsSchema]
});

boardSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
    ret.id = ret._id.toString();
    delete ret._id;
  }
});

module.exports = mongoose.model('Board', boardSchema);
