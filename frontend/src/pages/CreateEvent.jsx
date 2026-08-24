import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import { createEvent } from "../services/eventApi";

function CreateEvent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    event_date: "",
    start_time: "",
    end_time: "",
    capacity: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await createEvent({
        ...formData,
        capacity: Number(formData.capacity),
      });

      alert("Event created successfully");

      navigate("/organizer/events");

    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
        "Failed to create event"
      );
    }
  };

  return (
    <Container maxWidth="md">

      <Typography
        variant="h4"
        sx={{ mt: 4, mb: 3 }}
      >
        Create Event
      </Typography>

      {error && (
        <Typography
          color="error"
          sx={{ mb: 2 }}
        >
          {error}
        </Typography>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
      >

        <TextField
          fullWidth
          label="Event Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          select
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          margin="normal"
          required
        >
          <MenuItem value="Technology">
            Technology
          </MenuItem>

          <MenuItem value="Business">
            Business
          </MenuItem>

          <MenuItem value="Design">
            Design
          </MenuItem>

          <MenuItem value="Other">
            Other
          </MenuItem>
        </TextField>

        <TextField
          fullWidth
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          type="date"
          label="Event Date"
          name="event_date"
          value={formData.event_date}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          required
        />

        <TextField
          fullWidth
          type="time"
          label="Start Time"
          name="start_time"
          value={formData.start_time}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          required
        />

        <TextField
          fullWidth
          type="time"
          label="End Time"
          name="end_time"
          value={formData.end_time}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          required
        />

        <TextField
          fullWidth
          type="number"
          label="Capacity"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          margin="normal"
          inputProps={{
            min: 1,
          }}
          required
        />

        <Box sx={{ mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ mr: 2 }}
          >
            Create Event
          </Button>

          <Button
            variant="outlined"
            onClick={() =>
              navigate("/organizer/events")
            }
          >
            Cancel
          </Button>
        </Box>

      </Box>
    </Container>
  );
}

export default CreateEvent;