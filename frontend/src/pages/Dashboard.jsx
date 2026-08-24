import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import api from "../services/api";

function Dashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const response = await api.get(
          "/my-events"
        );

        setEvents(response.data.events);
      } catch (error) {
        console.error(
          "Failed to fetch registered events:",
          error
        );
      }
    };

    fetchMyEvents();
  }, []);

  return (
    <Container maxWidth="lg">

      <Typography
        variant="h4"
        sx={{ mt: 4, mb: 1 }}
      >
        My Dashboard
      </Typography>

      <Typography
        variant="h6"
        sx={{ mb: 3 }}
      >
        My Registered Events
      </Typography>

      <Grid container spacing={3}>

        {events.map((event) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={event.registration_id}
          >
            <Card>
              <CardContent>

                <Typography
                  variant="h6"
                  gutterBottom
                >
                  {event.title}
                </Typography>

                <Typography>
                  Category: {event.category}
                </Typography>

                <Typography>
                  Location: {event.location}
                </Typography>

                <Typography>
                  Date: {event.event_date}
                </Typography>

                <Typography>
                  Time: {event.start_time} -{" "}
                  {event.end_time}
                </Typography>

              </CardContent>
            </Card>
          </Grid>
        ))}

      </Grid>

      {events.length === 0 && (
        <Typography sx={{ mt: 3 }}>
          You haven't registered for any events yet.
        </Typography>
      )}

    </Container>
  );
}

export default Dashboard;