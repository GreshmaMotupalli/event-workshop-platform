const pool = require("../db/pool");

// CREATE EVENT
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      event_date,
      start_time,
      end_time,
      capacity,
    } = req.body;

    if (
      !title ||
      !category ||
      !location ||
      !event_date ||
      !start_time ||
      !end_time ||
      !capacity
    ) {
      return res.status(400).json({
        message: "Required event fields are missing",
      });
    }

    const result = await pool.query(
      `INSERT INTO events
       (title, description, category, location,
        event_date, start_time, end_time, capacity, organizer_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING *`,
      [
        title,
        description,
        category,
        location,
        event_date,
        start_time,
        end_time,
        capacity,
        req.user.userId,
      ]
    );

    res.status(201).json({
      message: "Event created successfully",
      event: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// GET ALL EVENTS
const getEvents = async (req, res) => {
  try {
    const { search, category, location } = req.query;

    let query = `
      SELECT
        e.id,
        e.title,
        e.description,
        e.category,
        e.location,
        e.event_date,
        e.start_time,
        e.end_time,
        e.capacity,
        e.organizer_id,
        e.created_at,
        u.name AS organizer_name
      FROM events e
      JOIN users u ON e.organizer_id = u.id
      WHERE 1=1
    `;

    const values = [];
    let parameterIndex = 1;

    if (search) {
      query += `
        AND (
          e.title ILIKE $${parameterIndex}
          OR e.description ILIKE $${parameterIndex}
        )
      `;

      values.push(`%${search}%`);
      parameterIndex++;
    }

    if (category) {
      query += ` AND e.category ILIKE $${parameterIndex}`;
      values.push(category);
      parameterIndex++;
    }

    if (location) {
      query += ` AND e.location ILIKE $${parameterIndex}`;
      values.push(location);
      parameterIndex++;
    }

    query += `
      ORDER BY e.event_date ASC, e.start_time ASC
    `;

    const result = await pool.query(query, values);

    res.json({
      events: result.rows,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// GET SINGLE EVENT
const getEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT
        e.id,
        e.title,
        e.description,
        e.category,
        e.location,
        e.event_date,
        e.start_time,
        e.end_time,
        e.capacity,
        e.organizer_id,
        e.created_at,
        u.name AS organizer_name
       FROM events e
       JOIN users u ON e.organizer_id = u.id
       WHERE e.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.json({
      event: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// UPDATE EVENT
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      category,
      location,
      event_date,
      start_time,
      end_time,
      capacity,
    } = req.body;

    const result = await pool.query(
      `UPDATE events
       SET
        title = $1,
        description = $2,
        category = $3,
        location = $4,
        event_date = $5,
        start_time = $6,
        end_time = $7,
        capacity = $8
       WHERE id = $9
         AND organizer_id = $10
       RETURNING *`,
      [
        title,
        description,
        category,
        location,
        event_date,
        start_time,
        end_time,
        capacity,
        id,
        req.user.userId,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Event not found or you are not the organizer",
      });
    }

    res.json({
      message: "Event updated successfully",
      event: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// DELETE EVENT
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM events
       WHERE id = $1
         AND organizer_id = $2
       RETURNING id`,
      [id, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Event not found or you are not the organizer",
      });
    }

    res.json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getMyEvents = async (req, res) => {
  try {
    console.log("Logged in user:", req.user);

    const organizerId = req.user.userId;

    console.log("Organizer ID:", organizerId);

    const result = await pool.query(
      `
      SELECT *
      FROM events
      WHERE organizer_id = $1
      ORDER BY event_date ASC
      `,
      [organizerId]
    );

    res.json({
      events: result.rows,
    });

  } catch (error) {
    console.error("GET MY EVENTS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch your events",
    });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  getMyEvents,
  updateEvent,
  deleteEvent,
};