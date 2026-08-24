const express = require("express");

const {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  getMyEvents,
} = require("../controllers/event.controller");

const authenticate = require("../middleware/auth.middleware");

const router = express.Router();

// Create
router.post("/", authenticate, createEvent);

// Read all
router.get("/", getEvents);

// My events
router.get("/my-events", authenticate, getMyEvents);

// Read one
router.get("/:id", getEvent);

// Update
router.put("/:id", authenticate, updateEvent);

// Delete
router.delete("/:id", authenticate, deleteEvent);

module.exports = router;