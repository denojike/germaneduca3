const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  location: {
    type: String
  },
  phone: {
    type: String,
    required: true
  },
  githubusername: {
    type: String
  }
});

module.exports = mongoose.model("Profile", ProfileSchema);
