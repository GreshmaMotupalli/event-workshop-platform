import { useEffect, useState } from "react";
import {
  Alert,
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

  if (loading) {
    return (
      <Container sx={{ py: 5, textAlign: "center" }}>
        <CircularProgress />

        <Typography sx={{ mt: 2 }}>
          Loading your registrations...
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 5 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
      >
        My Registrations
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Events you have registered for
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!error && registrations.length === 0 && (
        <Alert severity="info">
          You haven't registered for any events yet.
        </Alert>
      )}

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
              sx={{
                height: "100%",
                borderRadius: 3,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                >
                  {event.title}
                </Typography>

                <Chip
                  label={event.category}
                  size="small"
                  sx={{ mb: 2 }}
                />

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {event.description}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ mb: 1 }}
                >
                  📍 <strong>Location:</strong>{" "}
                  {event.location}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ mb: 1 }}
                >
                  📅 <strong>Date:</strong>{" "}
                  {new Date(
                    event.event_date
                  ).toLocaleDateString("en-IN")}
                </Typography>

                <Typography variant="body2">
                  ⏰ <strong>Time:</strong>{" "}
                  {event.start_time} - {event.end_time}
                </Typography>

                <Chip
                  label="Registered"
                  color="success"
                  size="small"
                  sx={{ mt: 2 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default MyRegistrations;
