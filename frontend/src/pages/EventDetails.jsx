import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { getEvent } from "../services/eventApi";
import { registerForEvent } from "../services/registrationApi";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getEvent(id);
        setEvent(response.data.event);
      } catch (error) {
        setError("Failed to load event");
      }
    };

    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      setError("");
      setMessage("");

      const response = await registerForEvent(id);

      setMessage(response.data.message);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) return "";

    return time.slice(0, 5);
  };

  if (error && !event) {
    return (
      <Box
        sx={{
          minHeight: "calc(100vh - 68px)",
          backgroundColor: "#F8FAFC",
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          <Alert severity="error">
            {error}
          </Alert>
        </Container>
      </Box>
    );
  }

  if (!event) {
    return (
      <Box
        sx={{
          minHeight: "calc(100vh - 68px)",
          backgroundColor: "#F8FAFC",
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          <Typography color="text.secondary">
            Loading event...
          </Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 68px)",
        backgroundColor: "#F8FAFC",
        pb: 6,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
          py: 5,
          color: "#FFFFFF",
        }}
      >
        <Container maxWidth="lg">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/events")}
            sx={{
              color: "#FFFFFF",
              mb: 3,
              "&:hover": {
                backgroundColor:
                  "rgba(255,255,255,0.12)",
              },
            }}
          >
            Back to Events
          </Button>

          <Chip
            label={event.category}
            sx={{
              backgroundColor: "#FFFFFF",
              color: "#4F46E5",
              fontWeight: 700,
              mb: 2,
            }}
          />

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 1.5,
              fontSize: {
                xs: "30px",
                md: "42px",
              },
            }}
          >
            {event.title}
          </Typography>

          <Typography
            sx={{
              color: "#E0E7FF",
              fontSize: "17px",
              maxWidth: 750,
            }}
          >
            {event.description}
          </Typography>
        </Container>
      </Box>

      {/* Main content */}
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
        }}
      >
        <Grid container spacing={3}>

          {/* LEFT */}
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                borderRadius: 3,
              }}
            >
              <CardContent sx={{ p: 4 }}>

                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                  }}
                >
                  Event Information
                </Typography>

                <Grid container spacing={3}>

                  {/* Date */}
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "flex-start",
                      }}
                    >
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#EEF2FF",
                        }}
                      >
                        <CalendarMonthOutlinedIcon
                          sx={{
                            color: "#4F46E5",
                          }}
                        />
                      </Box>

                      <Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          Date
                        </Typography>

                        <Typography
                          sx={{
                            fontWeight: 600,
                          }}
                        >
                          {formatDate(event.event_date)}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Time */}
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "flex-start",
                      }}
                    >
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#F5F3FF",
                        }}
                      >
                        <AccessTimeOutlinedIcon
                          sx={{
                            color: "#7C3AED",
                          }}
                        />
                      </Box>

                      <Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          Time
                        </Typography>

                        <Typography
                          sx={{
                            fontWeight: 600,
                          }}
                        >
                          {formatTime(event.start_time)}
                          {" - "}
                          {formatTime(event.end_time)}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Location */}
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "flex-start",
                      }}
                    >
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#EEF2FF",
                        }}
                      >
                        <LocationOnOutlinedIcon
                          sx={{
                            color: "#4F46E5",
                          }}
                        />
                      </Box>

                      <Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          Location
                        </Typography>

                        <Typography
                          sx={{
                            fontWeight: 600,
                          }}
                        >
                          {event.location}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Capacity */}
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "flex-start",
                      }}
                    >
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#F5F3FF",
                        }}
                      >
                        <PeopleOutlineOutlinedIcon
                          sx={{
                            color: "#7C3AED",
                          }}
                        />
                      </Box>

                      <Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          Capacity
                        </Typography>

                        <Typography
                          sx={{
                            fontWeight: 600,
                          }}
                        >
                          {event.capacity} attendees
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                {/* Description */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                  }}
                >
                  About this event
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.8,
                  }}
                >
                  {event.description}
                </Typography>

                <Divider sx={{ my: 4 }} />

                {/* Organizer */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #4F46E5, #7C3AED)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PersonOutlineOutlinedIcon
                      sx={{ color: "#FFFFFF" }}
                    />
                  </Box>

                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      Organized by
                    </Typography>

                    <Typography
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      {event.organizer_name}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* RIGHT - REGISTER */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                borderRadius: 3,
                position: {
                  md: "sticky",
                },
                top: 90,
                overflow: "hidden",
              }}
            >
              {/* Gradient header */}
              <Box
                sx={{
                  background:
                    "linear-gradient(135deg, #4F46E5, #7C3AED)",
                  px: 3,
                  py: 3,
                  color: "#FFFFFF",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Interested in this event?
                </Typography>

                <Typography
                  sx={{
                    color: "#E0E7FF",
                    mt: 0.5,
                    fontSize: 14,
                  }}
                >
                  Reserve your spot today.
                </Typography>
              </Box>

              <CardContent sx={{ p: 3 }}>

                {/* Date summary */}
                <Box sx={{ mb: 2.5 }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Event date
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {formatDate(event.event_date)}
                  </Typography>
                </Box>

                {/* Location summary */}
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Location
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {event.location}
                  </Typography>
                </Box>

                {/* Success */}
                {message && (
                  <Alert
                    severity="success"
                    sx={{ mb: 2 }}
                  >
                    {message}
                  </Alert>
                )}

                {/* Error */}
                {error && (
                  <Alert
                    severity="error"
                    sx={{ mb: 2 }}
                  >
                    {error}
                  </Alert>
                )}

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleRegister}
                  sx={{
                    py: 1.4,
                    fontWeight: 700,
                    backgroundColor: "#4F46E5",
                    "&:hover": {
                      backgroundColor: "#4338CA",
                    },
                  }}
                >
                  Register for Event
                </Button>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: "block",
                    textAlign: "center",
                    mt: 2,
                  }}
                >
                  Registration is required to attend
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default EventDetails;