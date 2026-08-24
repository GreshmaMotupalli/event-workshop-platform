import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
} from "@mui/material";

import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const navButtonStyle = (path) => ({
    color: isActive(path) ? "#FFFFFF" : "#E0E7FF",
    backgroundColor: isActive(path)
      ? "rgba(255, 255, 255, 0.15)"
      : "transparent",
    borderRadius: "8px",
    px: 2,
    py: 1,
    mx: 0.5,
    fontSize: "14px",
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.12)",
      color: "#FFFFFF",
    },
  });

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background:
            "linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <Toolbar
          sx={{
            minHeight: "68px",
            px: {
              xs: 2,
              md: 5,
            },
          }}
        >
          {/* Logo */}
          <Box
            component={Link}
            to="/events"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "#FFFFFF",
              mr: 4,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                letterSpacing: "-0.5px",
              }}
            >
              EventHub
            </Typography>
          </Box>

          {/* Navigation */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <Button
              component={Link}
              to="/events"
              sx={navButtonStyle("/events")}
            >
              Events
            </Button>

            <Button
              component={Link}
              to="/dashboard"
              sx={navButtonStyle("/dashboard")}
            >
              Dashboard
            </Button>

            {user?.role === "organizer" ? (
              <Button
                component={Link}
                to="/organizer/events"
                sx={navButtonStyle("/organizer/events")}
              >
                My Events
              </Button>
            ) : (
              <Button
                component={Link}
                to="/my-registrations"
                sx={navButtonStyle("/my-registrations")}
              >
                My Registrations
              </Button>
            )}
          </Box>

          {/* User */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mr: 2,
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: "rgba(255,255,255,0.2)",
                fontSize: "15px",
                fontWeight: 700,
              }}
            >
              {(user?.name || user?.email || "U")
                .charAt(0)
                .toUpperCase()}
            </Avatar>

            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                {user?.name || "User"}
              </Typography>

              <Typography
                sx={{
                  color: "#DDD6FE",
                  fontSize: "11px",
                  textTransform: "capitalize",
                }}
              >
                {user?.role || "User"}
              </Typography>
            </Box>
          </Box>

          {/* Logout */}
          <Button
            onClick={handleLogout}
            sx={{
              color: "#FFFFFF",
              border: "1px solid rgba(255,255,255,0.4)",
              borderRadius: "8px",
              px: 2,
              py: 0.8,
              fontSize: "13px",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.12)",
                borderColor: "#FFFFFF",
              },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  );
}

export default Navbar;