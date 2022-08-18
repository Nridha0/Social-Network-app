const { ObjectId } = require('mongoose').Types;
const {User, Thought, Reaction} = require ('../models');

module.exports = {
  getUsers(req, res) {
      User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId })
      .populate('thoughts')
      .populate('friends')

        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
      User.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.usertId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with this id!' })
            : res.json(user)
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
  
        });
      },
  
    deleteUser(req, res) {
      User.findOneAndRemove({ _id: req.params.userId })
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : Thought.deleteMany({ _id: { $in: user.thoughts } })
        )
        .then(() => res.json({ message: 'User and thoughts are deleted!' }))
        .catch((err) => res.status(500).json(err));
    },
  
    addFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res.status(404).json({ message: "No User find with this ID!" })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
  
  
    RemoveFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      )
        .then((friend) =>
            !friend
              ? res.status(404).json({ message: "No User find with this ID!" })
              : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
  };
  

  

