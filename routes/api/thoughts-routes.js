const router = require('express').Router();
const thoughtsControllers = require('../../controllers/thoughts-controllers');
const {
    getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
  getSingleThought,
} = require('../../controllers/thoughts-controllers');


router.route('/').get( getThoughts ).post(createThought);

//router.route('/:userId').post(createThought);
//.post(createThought);


router.route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router.route('/:thoughtId/reactions').post( addReaction )

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;

