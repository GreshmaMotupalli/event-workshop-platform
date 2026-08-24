import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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

  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyEvents();

      setEvents(response.data.events || []);
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

  // Open delete dialog
  const openDeleteDialog = (event) => {
    setSelectedEvent(event);
    setDeleteDialogOpen(true);
    setError("");
  };

  // Close delete dialog
  const closeDeleteDialog = () => {
    if (deleting) {
      return;
    }

    setDeleteDialogOpen(false);
    setSelectedEvent(null);
  };

  // Delete event
  const handleDelete = async () => {
    if (!selectedEvent) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await deleteEvent(selectedEvent.id);

      setEvents((currentEvents) =>
        currentEvents.filter(
          (event) => event.id !== selectedEvent.id
        )
      );

      setDeleteDialogOpen(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error("Failed to delete event:", error);

      setError("Failed to delete the event.");
    } finally {
      setDeleting(false);
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
      <Container maxWidth="xl">

        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 5,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight={700}
              color="primary"
              gutterBottom
            >
              My Events
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography
                variant="body1"
                color="text.secondary"
              >
                Manage the events you have created.
              </Typography>

              {!loading && events.length > 0 && (
                <Chip
                  label={`${events.length} Event${
                    events.length !== 1 ? "s" : ""
                  }`}
                  color="secondary"
                  variant="outlined"
                  size="small"
                />
              )}
            </Box>
          </Box>

          <Button
            variant="contained"
            color="secondary"
            onClick={() =>
              navigate("/organizer/events/create")
            }
            sx={{
              fontWeight: 600,
              px: 3,
            }}
          >
            + Create Event
          </Button>
        </Box>

        {/* Error */}
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 4,
              borderRadius: 2,
            }}
          >
            {error}
          </Alert>
        )}

        {/* Loading */}
        {loading && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: 8,
            }}
          >
            <CircularProgress color="secondary" />

            <Typography
              color="text.secondary"
              sx={{ mt: 2 }}
            >
              Loading your events...
            </Typography>
          </Box>
        )}

        {/* Empty State */}
        {!loading && events.length === 0 && (
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              textAlign: "center",
              py: 7,
              px: 3,
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                fontWeight={600}
                color="primary"
                gutterBottom
              >
                No Events Yet
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  mb: 3,
                  maxWidth: 500,
                  mx: "auto",
                }}
              >
                You haven't created any events yet.
                Create your first event and start managing
                your attendees.
              </Typography>

              <Button
                variant="contained"
                color="secondary"
                onClick={() =>
                  navigate("/organizer/events/create")
                }
                sx={{
                  fontWeight: 600,
                }}
              >
                Create Your First Event
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
                  elevation={0}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    transition: "all 0.25s ease",

                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 5,
                      borderColor: "secondary.main",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: 3,
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                    }}
                  >
                    {/* Category */}
                    <Box sx={{ mb: 2 }}>
                      <Chip
                        label={event.category}
                        size="small"
                        color="secondary"
                        sx={{
                          fontWeight: 600,
                        }}
                      />
                    </Box>

                    {/* Title */}
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color="primary"
                      sx={{
                        mb: 2,
                        lineHeight: 1.3,
                      }}
                    >
                      {event.title}
                    </Typography>

                    {/* Event Details */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                      }}
                    >
                      {/* Location */}
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography
                          component="span"
                          sx={{
                            fontSize: "16px",
                          }}
                        >
                          📍
                        </Typography>

                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                          >
                            Location
                          </Typography>

                          <Typography
                            variant="body2"
                            fontWeight={500}
                          >
                            {event.location}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Date */}
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography
                          component="span"
                          sx={{
                            fontSize: "16px",
                          }}
                        >
                          📅
                        </Typography>

                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                          >
                            Date
                          </Typography>

                          <Typography
                            variant="body2"
                            fontWeight={500}
                          >
                            {new Date(
                              event.event_date
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Capacity */}
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography
                          component="span"
                          sx={{
                            fontSize: "16px",
                          }}
                        >
                          👥
                        </Typography>

                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                          >
                            Capacity
                          </Typography>

                          <Typography
                            variant="body2"
                            fontWeight={500}
                          >
                            {event.capacity} attendees
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Spacer */}
                    <Box sx={{ flexGrow: 1 }} />

                    {/* Actions */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        mt: 4,
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={() =>
                          navigate(
                            `/organizer/events/${event.id}/edit`
                          )
                        }
                        sx={{
                          fontWeight: 600,
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        onClick={() =>
                          openDeleteDialog(event)
                        }
                        sx={{
                          fontWeight: 600,
                        }}
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

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={closeDeleteDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle
            sx={{
              fontWeight: 700,
              color: "primary.main",
              pb: 1,
            }}
          >
            Delete Event?
          </DialogTitle>

          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete{" "}
              <Box
                component="span"
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                }}
              >
                {selectedEvent?.title}
              </Box>
              ?
            </DialogContentText>

            <DialogContentText sx={{ mt: 1 }}>
              This action cannot be undone. The event will
              be permanently removed.
            </DialogContentText>
          </DialogContent>

          <DialogActions
            sx={{
              px: 3,
              pb: 3,
              gap: 1,
            }}
          >
            <Button
              onClick={closeDeleteDialog}
              variant="outlined"
              disabled={deleting}
            >
              Cancel
            </Button>

            <Button
              onClick={handleDelete}
              color="error"
              variant="contained"
              disabled={deleting}
              sx={{
                minWidth: 120,
                fontWeight: 600,
              }}
            >
              {deleting ? (
                <CircularProgress
                  size={21}
                  color="inherit"
                />
              ) : (
                "Delete Event"
              )}
            </Button>
          </DialogActions>
        </Dialog>

      </Container>
    </Box>
  );
}

export default OrganizerEvents;

