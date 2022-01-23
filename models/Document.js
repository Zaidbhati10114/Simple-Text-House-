const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
});

mongoose.exports = mongoose.model("Document", documentSchema);
