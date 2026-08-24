import { useEffect, useState } from "react";
import {
  Alert,
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

function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getMyRegistrations();

        setRegistrations(response.data.events || []);
      } catch (error) {
        console.error("Error fetching registrations:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load your registrations."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  /* Loading */
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
          py: 8,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            textAlign: "center",
          }}
        >
          <CircularProgress color="secondary" />

          <Typography
            sx={{ mt: 2 }}
            color="text.secondary"
          >
            Loading your registrations...
          </Typography>
        </Container>
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
      <Container maxWidth="lg">

        {/* Page Header */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            color="primary"
            gutterBottom
          >
            My Registrations
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
              Events you have registered for
            </Typography>

            {!error && registrations.length > 0 && (
              <Chip
                label={`${registrations.length} Registered`}
                color="secondary"
                variant="outlined"
                size="small"
              />
            )}
          </Box>
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

        {/* Empty State */}
        {!error && registrations.length === 0 && (
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
                variant="h6"
                fontWeight={600}
                gutterBottom
              >
                No Registered Events
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                You haven't registered for any events yet.
                Explore the available events and register for one!
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Registration Cards */}
        {!error && registrations.length > 0 && (
          <Grid container spacing={3}>
            {registrations.map((event) => (
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
                      flexGrow: 1,
                    }}
                  >
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

                    {/* Event Title */}
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
                          mb: 3,
                          lineHeight: 1.6,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {event.description}
                      </Typography>
                    )}

                    {/* Event Information */}
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
                          sx={{ fontSize: "16px" }}
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
                          sx={{ fontSize: "16px" }}
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
                            ).toLocaleDateString("en-IN")}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Time */}
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography
                          component="span"
                          sx={{ fontSize: "16px" }}
                        >
                          ⏰
                        </Typography>

                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                          >
                            Time
                          </Typography>

                          <Typography
                            variant="body2"
                            fontWeight={500}
                          >
                            {event.start_time} - {event.end_time}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Registration Status */}
                    <Box sx={{ mt: 3 }}>
                      <Chip
                        label="Registered"
                        color="success"
                        size="small"
                        variant="outlined"
                        sx={{
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

      </Container>
    </Box>
  );
}

export default MyRegistrations;

