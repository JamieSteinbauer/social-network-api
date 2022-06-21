const { Schema, model } = require("mongoose");

const UserSchema = new Schema( 
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: [true, "Email required"],
            unique: true,
            validate: {
                validator: function(v) {
                    //check if correct
                    return '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/'.test(v);
                },
                message: "Please enter a valid email"
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

//virtual called reactionCount that retrieves the length of the thought's reactions array field
UserSchema.virtual("friendCount").get(function() {
    return this.friends.length
})

const User = model("User", UserSchema);

module.exports = User;