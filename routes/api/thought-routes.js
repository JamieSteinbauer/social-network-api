const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// /api/thought/<userId>
router.route('/:userId').post(addThought);


router.route('/:userId').get(getAllThoughts);

// /api/thought/<userId>/<thoughtId>
router
    .route('/:userId/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought)

// /api/thought/<userId>/<thoughtId>
router
    .route('/:userId/:reactionId')
    //updating the existing post
    .put(addReaction)
    .delete(removeReaction)


module.exports = router;