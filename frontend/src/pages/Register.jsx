import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "attendee",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", formData);

      alert("Registration successful");

      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f7fa",
        py: 5,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={4}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 3,
            maxWidth: 480,
            mx: "auto",
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#1a237e",
                mb: 1,
              }}
            >
              Event Platform
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 1,
              }}
            >
              Create Your Account
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Join events or organize your own
            </Typography>
          </Box>

          {/* Error */}
          {error && (
            <Box
              sx={{
                mb: 2,
                p: 1.5,
                borderRadius: 1,
                backgroundColor: "#ffebee",
              }}
            >
              <Typography
                color="error"
                variant="body2"
              >
                {error}
              </Typography>
            </Box>
          )}

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
          >
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
              autoComplete="name"
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              autoComplete="email"
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              autoComplete="new-password"
            />

            <TextField
              fullWidth
              select
              label="Account Type"
              name="role"
              value={formData.role}
              onChange={handleChange}
              margin="normal"
              required
            >
              <MenuItem value="attendee">
                Attendee
              </MenuItem>

              <MenuItem value="organizer">
                Organizer
              </MenuItem>
            </TextField>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                mt: 3,
                py: 1.4,
                borderRadius: 2,
                backgroundColor: "#1a237e",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#121858",
                },
              }}
            >
              Create Account
            </Button>
          </Box>

          {/* Login link */}
          <Box
            sx={{
              textAlign: "center",
              mt: 3,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Already have an account?{" "}
              <Typography
                component={Link}
                to="/login"
                variant="body2"
                sx={{
                  color: "#00897b",
                  fontWeight: 600,
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Login
              </Typography>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Register;
