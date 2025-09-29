const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    date: {
      type: Date,
      required: [true, "Please add a date"],
    },
    venue: {
      type: String,
      required: [true, "Please add a venue"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    photo: {
      type: String, // Will store the path to the image
      default: "/uploads/default-event.png",
    },
    society: {
      type: String,
      enum: [
        "General",
        "Computer Society",
        "Communication Society",
        "WIE",
        "SIGHT",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
