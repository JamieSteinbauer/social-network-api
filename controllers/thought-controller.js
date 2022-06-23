const { User, Thought } = require("../models");

const thoughtController = {
    //add thought to user
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
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

    // add reply to thought otherwise known as reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoguhtId },
            { $push: { reactions: body } },
            { new: true, runValiddators: true }
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
            { $pull: { reaction: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
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