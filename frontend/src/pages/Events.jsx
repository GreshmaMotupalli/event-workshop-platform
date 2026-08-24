import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { getEvents } from "../services/eventApi";

function Events() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const fetchEvents = async () => {
    try {
      const response = await getEvents({
        search,
        category,
        location,
      });

      setEvents(response.data.events || []);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [search, category, location]);

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 68px)",
        backgroundColor: "#F8FAFC",
      }}
    >
      {/* HERO SECTION */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
          color: "#FFFFFF",
          py: {
            xs: 5,
            md: 7,
          },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            sx={{
              fontSize: {
                xs: "32px",
                md: "42px",
              },
              fontWeight: 800,
              mb: 1.5,
              letterSpacing: "-1px",
            }}
          >
            Discover Events
          </Typography>

          <Typography
            sx={{
              fontSize: "17px",
              color: "#E0E7FF",
              maxWidth: 600,
            }}
          >
            Find workshops, conferences and experiences
            that match your interests.
          </Typography>
        </Container>
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          mt: {
            xs: -3,
            md: -4,
          },
          pb: 6,
        }}
      >
        {/* SEARCH / FILTER CARD */}
        <Card
          sx={{
            p: {
              xs: 2,
              md: 3,
            },
            borderRadius: 3,
            boxShadow:
              "0 8px 30px rgba(15, 23, 42, 0.08)",
            mb: 5,
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "2fr 1fr 1fr",
              },
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              label="Search events"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              select
              fullWidth
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="">
                All Categories
              </MenuItem>

              <MenuItem value="Technology">
                Technology
              </MenuItem>

              <MenuItem value="Business">
                Business
              </MenuItem>

              <MenuItem value="Design">
                Design
              </MenuItem>
            </TextField>

            <TextField
              fullWidth
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnOutlinedIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Card>

        {/* RESULTS HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#111827",
              }}
            >
              Upcoming Events
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              {events.length}{" "}
              {events.length === 1 ? "event" : "events"} available
            </Typography>
          </Box>
        </Box>

        {/* EVENT CARDS */}
        {events.length > 0 && (
          <Grid container spacing={3}>
            {events.map((event) => (
              <Grid
                item
                xs={12}
                sm={6}
                lg={4}
                key={event.id}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    overflow: "hidden",
                    transition:
                      "transform 0.2s ease, box-shadow 0.2s ease",

                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow:
                        "0 16px 35px rgba(79, 70, 229, 0.15)",
                    },
                  }}
                >
                  {/* CARD TOP */}
                  <Box
                    sx={{
                      height: 110,
                      background:
                        "linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 42,
                        fontWeight: 800,
                        color: "#4F46E5",
                        opacity: 0.15,
                      }}
                    >
                      EVENT
                    </Typography>

                    <Chip
                      label={event.category}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 14,
                        left: 14,
                        backgroundColor: "#FFFFFF",
                        color: "#4F46E5",
                        fontWeight: 700,
                        boxShadow:
                          "0 2px 8px rgba(0,0,0,0.08)",
                      }}
                    />
                  </Box>

                  <CardContent
                    sx={{
                      p: 3,
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                    }}
                  >
                    {/* TITLE */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        color: "#111827",
                      }}
                    >
                      {event.title}
                    </Typography>

                    {/* DESCRIPTION */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2.5,
                        lineHeight: 1.6,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: 45,
                      }}
                    >
                      {event.description}
                    </Typography>

                    {/* DETAILS */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.3,
                        mb: 3,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.2,
                        }}
                      >
                        <CalendarMonthOutlinedIcon
                          sx={{
                            fontSize: 19,
                            color: "#4F46E5",
                          }}
                        />

                        <Typography variant="body2">
                          {formatDate(event.event_date)}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.2,
                        }}
                      >
                        <LocationOnOutlinedIcon
                          sx={{
                            fontSize: 19,
                            color: "#7C3AED",
                          }}
                        />

                        <Typography
                          variant="body2"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {event.location}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.2,
                        }}
                      >
                        <PersonOutlineOutlinedIcon
                          sx={{
                            fontSize: 19,
                            color: "#64748B",
                          }}
                        />

                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {event.organizer_name}
                        </Typography>
                      </Box>
                    </Box>

                    {/* BUTTON */}
                    <Button
                      fullWidth
                      variant="contained"
                      endIcon={<ArrowForwardIcon />}
                      onClick={() =>
                        navigate(`/events/${event.id}`)
                      }
                      sx={{
                        mt: "auto",
                        backgroundColor: "#4F46E5",
                        "&:hover": {
                          backgroundColor: "#4338CA",
                        },
                      }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* EMPTY STATE */}
        {events.length === 0 && (
          <Card
            sx={{
              borderRadius: 3,
              textAlign: "center",
              py: 8,
              px: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 1,
              }}
            >
              No events found
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Try changing your search or filters.
            </Typography>

            <Button
              variant="outlined"
              onClick={() => {
                setSearch("");
                setCategory("");
                setLocation("");
              }}
              sx={{
                color: "#4F46E5",
                borderColor: "#4F46E5",
              }}
            >
              Clear Filters
            </Button>
          </Card>
        )}
      </Container>
    </Box>
  );
}

export default Events;
