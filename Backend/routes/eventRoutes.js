const express = require("express");
const router = express.Router();
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const { protect, isOfficer } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Public route to get all events
router.get("/", getEvents);

// Protected routes for branch officers only
router.post("/", protect, isOfficer, upload.single("photo"), createEvent);
router.put("/:id", protect, isOfficer, updateEvent);
router.delete("/:id", protect, isOfficer, deleteEvent);

module.exports = router;
