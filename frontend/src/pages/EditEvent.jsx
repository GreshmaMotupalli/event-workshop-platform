import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Alert,
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

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        px: { xs: 2, md: 3 },
        py: 5,
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
        >
          Edit Event
        </Typography>

        <Typography color="text.secondary">
          Update the details of your event.
        </Typography>
      </Box>

      {/* Error */}
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      {/* Form */}
      <Card
        elevation={2}
        sx={{
          borderRadius: 3,
        }}
      >
        <CardContent
          sx={{
            p: { xs: 2, md: 4 },
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
          >
            <Grid container spacing={3}>

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

              {/* Capacity */}
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

              {/* Buttons */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() =>
                      navigate("/organizer/events")
                    }
                    disabled={saving}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={saving}
                    sx={{
                      minWidth: 140,
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
              </Grid>

            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default EditEvent;