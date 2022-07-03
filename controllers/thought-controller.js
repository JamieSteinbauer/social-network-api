const { User, Thought } = require("../models");

const thoughtController = {
    // get all thoguhts
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .populate({
            path: 'thought',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .then((dbThoguhtData) => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    //add thought to user
    addThought({ body }, res) {
        Thought.create(body)
        .then((thoughtData) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: thoughtData._id } },
                { new: true }
            );
        })
        .then((dbUserData) => {
            if(!dbUserData) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought with this id' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.status(400).json(err));
    },

    // add reply to thought otherwise known as reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoguhtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then((dbUserData) => {
            if(!dbUserData) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    },

    //remove the reaction from the thought
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },
    
    // remove thought
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then((deletedThought) => {
            if(!deletedThought) {
                return res.status(404).json({ message: "No thought with this id! "});
            }
            return User.findOneAndUdpdate(
                { _id: params.userId },
                { $pull: { thought: params.thoughtId } },
                { new: true }
            );
        })
        .then((dbUserData) => {
            if(!dbUserData) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    }
};

module.exports = thoughtController;