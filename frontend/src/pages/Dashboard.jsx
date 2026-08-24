
import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import { getMyRegistrations } from "../services/registrationApi";

function Dashboard() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        setLoading(true);

        const response = await getMyRegistrations();

        setRegistrations(response.data.events || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          py: 8,
          textAlign: "center",
        }}
      >
        <CircularProgress color="secondary" />

        <Typography
          sx={{ mt: 2 }}
          color="text.secondary"
        >
          Loading your dashboard...
        </Typography>
      </Container>
    );
  }

  // Get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Separate upcoming and completed events
  const upcomingEvents = registrations.filter((event) => {
    const eventDate = new Date(event.event_date);
    eventDate.setHours(0, 0, 0, 0);

    return eventDate >= today;
  });

  const completedEvents = registrations.filter((event) => {
    const eventDate = new Date(event.event_date);
    eventDate.setHours(0, 0, 0, 0);

    return eventDate < today;
  });

  // Show only first 3 upcoming events
  const upcomingPreview = upcomingEvents.slice(0, 3);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        py: 5,
      }}
    >
      <Container maxWidth="lg">

        {/* Header */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            color="primary"
            gutterBottom
          >
            My Dashboard
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
          >
            Welcome back! Here's an overview of your events.
          </Typography>
        </Box>

        {/* Statistics */}
        <Grid container spacing={3} sx={{ mb: 5 }}>

          {/* Total Registered */}
          <Grid item xs={12} sm={4}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                >
                  Total Registered
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight={700}
                  color="primary"
                >
                  {registrations.length}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Events you have registered for
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Upcoming */}
          <Grid item xs={12} sm={4}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                >
                  Upcoming Events
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight={700}
                  color="secondary"
                >
                  {upcomingEvents.length}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Events you can attend
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Completed */}
          <Grid item xs={12} sm={4}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                >
                  Completed Events
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight={700}
                >
                  {completedEvents.length}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Events you have attended
                </Typography>
              </CardContent>
            </Card>
          </Grid>

        </Grid>

        {/* Upcoming Events */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            fontWeight={600}
            gutterBottom
          >
            Upcoming Events
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Your next registered events
          </Typography>
        </Box>

        {upcomingPreview.length > 0 ? (
          <Grid container spacing={3}>
            {upcomingPreview.map((event) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={event.registration_id}
              >
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
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
                  <CardContent sx={{ p: 3 }}>

                    {/* Category */}
                    <Chip
                      label={event.category}
                      size="small"
                      color="secondary"
                      sx={{
                        mb: 2,
                        fontWeight: 600,
                      }}
                    />

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

                    {/* Description */}
                    {event.description && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {event.description}
                      </Typography>
                    )}

                    {/* Location */}
                    <Typography
                      variant="body2"
                      sx={{ mb: 1 }}
                    >
                      📍{" "}
                      <Box
                        component="span"
                        color="text.secondary"
                      >
                        {event.location}
                      </Box>
                    </Typography>

                    {/* Date */}
                    <Typography
                      variant="body2"
                      sx={{ mb: 1 }}
                    >
                      📅{" "}
                      <Box
                        component="span"
                        color="text.secondary"
                      >
                        {new Date(
                          event.event_date
                        ).toLocaleDateString("en-IN")}
                      </Box>
                    </Typography>

                    {/* Time */}
                    <Typography variant="body2">
                      ⏰{" "}
                      <Box
                        component="span"
                        color="text.secondary"
                      >
                        {event.start_time} - {event.end_time}
                      </Box>
                    </Typography>

                    {/* Status */}
                    <Box sx={{ mt: 3 }}>
                      <Chip
                        label="Registered"
                        color="success"
                        size="small"
                        variant="outlined"
                      />
                    </Box>

                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              textAlign: "center",
              py: 6,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                fontWeight={600}
                gutterBottom
              >
                No Upcoming Events
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                You don't have any upcoming registered events.
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* More events message */}
        {upcomingEvents.length > 3 && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 3,
              textAlign: "center",
            }}
          >
            You have {upcomingEvents.length - 3} more upcoming
            event
            {upcomingEvents.length - 3 !== 1 ? "s" : ""}.
            Visit <strong>My Registrations</strong> to view all
            your registrations.
          </Typography>
        )}

      </Container>
    </Box>
  );
}

export default Dashboard;

