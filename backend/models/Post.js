const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema(
  {
    author: { type: Schema.Types.String, ref: "Users" },
    post: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", Post);
