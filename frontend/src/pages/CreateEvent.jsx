
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
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
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        py: 5,
      }}
    >
      <Container maxWidth="md">

        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            color="primary"
            gutterBottom
          >
            Create Event
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
          >
            Create and publish a new event for attendees.
          </Typography>
        </Box>

        {/* Form Card */}
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>

            {/* Error */}
            {error && (
              <Box
                sx={{
                  mb: 3,
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "error.light",
                }}
              >
                <Typography
                  color="error"
                  variant="body2"
                  fontWeight={500}
                >
                  {error}
                </Typography>
              </Box>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
            >

              {/* Basic Information */}
              <Typography
                variant="h6"
                fontWeight={600}
                color="primary"
                sx={{ mb: 2 }}
              >
                Basic Information
              </Typography>

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

              {/* Date & Time */}
              <Typography
                variant="h6"
                fontWeight={600}
                color="primary"
                sx={{
                  mt: 4,
                  mb: 1,
                }}
              >
                Date & Time
              </Typography>

              <Grid container spacing={2}>

                <Grid item xs={12}>
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
                </Grid>

                <Grid item xs={12} sm={6}>
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
                </Grid>

                <Grid item xs={12} sm={6}>
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
                </Grid>

              </Grid>

              {/* Capacity */}
              <Typography
                variant="h6"
                fontWeight={600}
                color="primary"
                sx={{
                  mt: 4,
                  mb: 1,
                }}
              >
                Capacity
              </Typography>

              <TextField
                fullWidth
                type="number"
                label="Maximum Attendees"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                margin="normal"
                inputProps={{
                  min: 1,
                }}
                helperText="Enter the maximum number of attendees allowed."
                required
              />

              {/* Buttons */}
              <Box
                sx={{
                  mt: 4,
                  pt: 3,
                  borderTop: "1px solid",
                  borderColor: "divider",
                  display: "flex",
                  gap: 2,
                  justifyContent: "flex-end",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() =>
                    navigate("/organizer/events")
                  }
                  sx={{
                    minWidth: 100,
                  }}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  sx={{
                    minWidth: 140,
                    fontWeight: 600,
                  }}
                >
                  Create Event
                </Button>
              </Box>

            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default CreateEvent;

