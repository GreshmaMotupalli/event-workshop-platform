const pool = require("../db/pool");

const registerForEvent = async (req, res) => {
  try {
    const { id: eventId } = req.params;
    const userId = req.user.userId;

    // Check if event exists
    const eventResult = await pool.query(
      "SELECT * FROM events WHERE id = $1",
      [eventId]
    );

    if (eventResult.rows.length === 0) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    const event = eventResult.rows[0];

    // Prevent organizer from registering for their own event
    if (Number(event.organizer_id) === Number(userId)) {
      return res.status(403).json({
        message: "Organizers cannot register for their own events",
      });
    }

    // Check if user already registered
    const existingRegistration = await pool.query(
      `SELECT id
       FROM registrations
       WHERE user_id = $1
       AND event_id = $2`,
      [userId, eventId]
    );

    if (existingRegistration.rows.length > 0) {
      return res.status(400).json({
        message: "You are already registered for this event",
      });
    }

    // Check capacity
    const countResult = await pool.query(
      `SELECT COUNT(*)
       FROM registrations
       WHERE event_id = $1`,
      [eventId]
    );

    const registeredCount = Number(countResult.rows[0].count);

    if (registeredCount >= event.capacity) {
      return res.status(400).json({
        message: "Event is full",
      });
    }

    // Create registration
    const result = await pool.query(
      `INSERT INTO registrations
       (user_id, event_id)
       VALUES ($1, $2)
       RETURNING *`,
      [userId, eventId]
    );

    res.status(201).json({
      message: "Successfully registered for event",
      registration: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getMyRegistrations = async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      `
      SELECT
        r.id AS registration_id,
        e.id,
        e.title,
        e.description,
        e.category,
        e.location,
        e.event_date,
        e.start_time,
        e.end_time
      FROM registrations r
      JOIN events e
        ON r.event_id = e.id
      WHERE r.user_id = $1
      ORDER BY e.event_date ASC
      `,
      [userId]
    );

    res.json({
      events: result.rows,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch registered events",
    });
  }
};

module.exports = {
  registerForEvent,
  getMyRegistrations,
};
