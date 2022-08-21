const { Schema, model, Types } = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require ('moment')

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
const Thought = model('Thought', thoughtSchema);
 thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
 })


module.exports = Thought;