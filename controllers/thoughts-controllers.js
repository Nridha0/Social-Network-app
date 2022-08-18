const {User, Thought} = require ('../models');
module.exports = {
    getThought(req, res) {
        Thought.find()
          .then((thought) => res.json(thought))
          .catch((err) => res.status(500).json(err));
      },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .then((user) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
    createThought(req, res) {
        Thought.create(req.body)
          .then((thought) => {
              return User.findOneAndUpdate(
                  { _id: req.body.userId},
                  { $push: {thoughts: thought._id}},
                  { new: true }
              );
          })
          .then((user)=> 
          !user
          ? res.status(404).json({ message: 'Thought Created, but no user with that ID' })
          : res.json('Create thought')
      )
      .catch((err) => res.status(500).json(err));
  },

  updateThought(req, res) {
    Video.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteThought(req, res) {
    thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : User.findOneAndUpdate(
              { videos: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'thought deleted but no user with this id!' })
          : res.json({ message: 'thought successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },
 
  ThoughReaction(req, res) {
    thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { responses: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  removethoughtResponse(req, res) {
    thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};

