import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import api from "../services/api";

function EditEvent() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch event
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`);

        const event = response.data.event;

        setFormData({
          title: event.title || "",
          description: event.description || "",
          category: event.category || "",
          location: event.location || "",
          event_date: event.event_date
            ? event.event_date.split("T")[0]
            : "",
          start_time: event.start_time
            ? event.start_time.substring(0, 5)
            : "",
          end_time: event.end_time
            ? event.end_time.substring(0, 5)
            : "",
          capacity: event.capacity || "",
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load event.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");

    try {
      await api.put(`/events/${id}`, formData);

      navigate("/organizer/events");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to update event."
      );
    } finally {
      setSaving(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "background.default",
        }}
      >
        <CircularProgress color="secondary" />

        <Typography
          sx={{ mt: 2 }}
          color="text.secondary"
        >
          Loading event details...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        py: 5,
      }}
    >
      <Container maxWidth="xl">

        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            color="primary"
            gutterBottom
          >
            Edit Event
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
          >
            Update the details of your event.
          </Typography>
        </Box>

        {/* Error */}
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 2,
            }}
          >
            {error}
          </Alert>
        )}

        {/* Form Card */}
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <CardContent
            sx={{
              p: { xs: 3, md: 4 },
            }}
          >
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

              <Grid container spacing={2}>

                {/* Title */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Event Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                  />
                </Grid>

                {/* Category */}
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    fullWidth
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="Technology">
                      Technology
                    </MenuItem>

                    <MenuItem value="Workshop">
                      Workshop
                    </MenuItem>

                    <MenuItem value="Conference">
                      Conference
                    </MenuItem>

                    <MenuItem value="Networking">
                      Networking
                    </MenuItem>

                    <MenuItem value="Other">
                      Other
                    </MenuItem>
                  </TextField>
                </Grid>

                {/* Location */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </Grid>

              </Grid>

              {/* Date & Time */}
              <Typography
                variant="h6"
                fontWeight={600}
                color="primary"
                sx={{
                  mt: 4,
                  mb: 2,
                }}
              >
                Date & Time
              </Typography>

              <Grid container spacing={2}>

                {/* Date */}
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Event Date"
                    name="event_date"
                    value={formData.event_date}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                </Grid>

                {/* Start Time */}
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="time"
                    label="Start Time"
                    name="start_time"
                    value={formData.start_time}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                </Grid>

                {/* End Time */}
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="time"
                    label="End Time"
                    name="end_time"
                    value={formData.end_time}
                    onChange={handleChange}
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
                  mb: 2,
                }}
              >
                Capacity
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Maximum Capacity"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    inputProps={{
                      min: 1,
                    }}
                    required
                  />
                </Grid>
              </Grid>

              {/* Buttons */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  mt: 5,
                  pt: 3,
                  borderTop: "1px solid",
                  borderColor: "divider",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() =>
                    navigate("/organizer/events")
                  }
                  disabled={saving}
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
                  disabled={saving}
                  sx={{
                    minWidth: 140,
                    fontWeight: 600,
                  }}
                >
                  {saving ? (
                    <CircularProgress
                      size={22}
                      color="inherit"
                    />
                  ) : (
                    "Update Event"
                  )}
                </Button>
              </Box>

            </Box>
          </CardContent>
        </Card>

      </Container>
    </Box>
  );
}

export default EditEvent;

