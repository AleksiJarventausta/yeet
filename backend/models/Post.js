const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let postSchema = new Schema({
  _id: Schema.Types.ObjectId,

  description: {
    type: String
  },

  active: {
    type: Boolean,
    default: false
  },
  poster: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  liked: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  unliked: [{ type: mongoose.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Post", postSchema);
