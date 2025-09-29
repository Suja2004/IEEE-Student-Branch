const asyncHandler = require("express-async-handler");
const Event = require("../models/Event");
const User = require("../models/User");
const sendEmail = require("../utils/emailNotifier");

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({}).sort({ date: -1 }); // Sort by newest first
  res.status(200).json(events);
});

// @desc    Create new event
// @route   POST /api/events
// @access  Private (Officer only)
const createEvent = asyncHandler(async (req, res) => {
  const { title, date, venue, description, society } = req.body;

  if (!title || !date || !venue || !description || !society) {
    res.status(400);
    throw new Error(
      `Please include all fields ${title} ${date} ${venue} ${description} ${society}`
    );
  }

  const event = await Event.create({
    title,
    date,
    venue,
    description,
    society,
    photo: req.file ? `/uploads/${req.file.filename}` : undefined,
  });

  // --- Email Notification ---
  try {
    const members = await User.find({ role: "member" });
    const memberEmails = members.map((member) => member.email);

    if (memberEmails.length > 0) {
      const subject = `New IEEE Event: ${event.title}`;
      const text = `
                Hello IEEE Member,

                A new event has been scheduled!
                
                Event: ${event.title}
                Date: ${new Date(event.date).toLocaleDateString()}
                Venue: ${event.venue}
                Description: ${event.description}
                
                We look forward to seeing you there!
                
                Best,
                IEEE SMVITM Student Branch
            `;
      await sendEmail(memberEmails, subject, text);
      console.log("Notification emails sent successfully.");
    }
  } catch (error) {
    console.error("Failed to send notification emails:", error);
    // Don't fail the request, just log the email error
  }

  res.status(201).json(event);
});

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private (Officer only)
const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedEvent);
});

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private (Officer only)
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  await event.remove();
  res.status(200).json({ id: req.params.id, message: "Event removed" });
});

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
