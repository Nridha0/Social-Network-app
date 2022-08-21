const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username:{
      type: String,
      require: true,
      unique: true,
      trim: true,
  },
    email:{
      type: String,
      unique: true,
      required: true,
        match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
  },
  
    thoughts:[{
      type: Schema.Types.ObjectId,
      ref: 'thought',
  }],
  
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
}]
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
  }
);

const User = model('User', userSchema);

module.exports = User;