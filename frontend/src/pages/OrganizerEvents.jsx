import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import {
  getMyEvents,
  deleteEvent,
} from "../services/eventApi";

function OrganizerEvents() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyEvents();

      setEvents(response.data.events);
    } catch (error) {
      console.error("Failed to fetch events:", error);

      setError("Failed to load your events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteEvent(id);

      setEvents((currentEvents) =>
        currentEvents.filter((event) => event.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete event:", error);

      setError("Failed to delete the event.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>

      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={700}
          >
            My Events
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            Manage the events you have created.
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={() =>
            navigate("/organizer/events/create")
          }
        >
          Create Event
        </Button>
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

      {/* Loading */}
      {loading && (
        <Typography color="text.secondary">
          Loading your events...
        </Typography>
      )}

      {/* Empty state */}
      {!loading && events.length === 0 && (
        <Card
          sx={{
            textAlign: "center",
            py: 6,
            borderRadius: 3,
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
            >
              No events yet
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Create your first event to get started.
            </Typography>

            <Button
              variant="contained"
              onClick={() =>
                navigate("/organizer/events/create")
              }
            >
              Create Event
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Events */}
      {!loading && events.length > 0 && (
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={event.id}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  transition: "0.2s",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: 5,
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 3,
                    flexGrow: 1,
                  }}
                >
                  {/* Title */}
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ mb: 1 }}
                  >
                    {event.title}
                  </Typography>

                  {/* Category */}
                  <Chip
                    label={event.category}
                    size="small"
                    sx={{ mb: 2 }}
                  />

                  {/* Details */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    📍 {event.location}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    📅{" "}
                    {new Date(event.event_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    })}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    👥 Capacity: {event.capacity}
                  </Typography>

                  {/* Actions */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      mt: 3,
                    }}
                  >
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() =>
                        navigate(
                          `/organizer/events/${event.id}/edit`
                        )
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      fullWidth
                      onClick={() =>
                        handleDelete(event.id)
                      }
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

    </Container>
  );
}

export default OrganizerEvents;