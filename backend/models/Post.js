const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

  unliked: [{ type: mongoose.Types.ObjectId, ref: "User" }],

  games: [{ type: Number }]
});

module.exports = mongoose.model("Post", postSchema);
