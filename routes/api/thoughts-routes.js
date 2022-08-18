const router = require('express').Router();
const {
    getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughts-controllers');


router.route('/').get(getAllThoughts).post(createThought);


router
  .route('/: id')
  .get(getThoughtById)
  .put(updateThoughtById)
  .delete(deleteThought);

router.route('/:ThoughtId/reaction').post(addReaction);

router.route('/:id').delete(removeReaction);

module.exports = router;

