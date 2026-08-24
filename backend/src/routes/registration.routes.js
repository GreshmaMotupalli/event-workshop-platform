const express = require("express");

const {
  registerForEvent,
  getMyRegistrations,
} = require("../controllers/registration.controller");

const authenticate = require("../middleware/auth.middleware");

const router = express.Router();

router.post(
  "/events/:id/register",
  authenticate,
  registerForEvent
);

router.get(
  "/my-events",
  authenticate,
  getMyRegistrations
);

module.exports = router;