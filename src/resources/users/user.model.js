const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userShema = new Schema(
  {
    name: String,
    login: String,
    password: {
      type: String,
      select: false
    }
  },
  {
    collection: 'users'
  }
);

userShema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
    ret.id = ret._id.toString();
    delete ret._id;
  }
});

module.exports = mongoose.model('User', userShema);
