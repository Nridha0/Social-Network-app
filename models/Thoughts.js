const { Schema, model } = require('mongoose');
//const moment = require ('moment')
const Reaction = require('./Reaction');

// Schema to create Post model
const thoughtSchema = new Schema(
    {
        thoughtTxt:{
            type: String,
            required: true,
            maxLength: 280,
        },
        createdAt:{
            type: Date,
            default: Date.now,
            get: dateVal=>moment(dateVal).format("MMM DD, YYYY [at] hh:mm a"),
        },
        username:{
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
          },
          id: false,
    }
);

thoughtSchema.virtuals('reactionCount')
.get(function(){
    return this.reactions.length;
})
const Thought = model('Thought', thoughtSchema);

model.exports = Thought;