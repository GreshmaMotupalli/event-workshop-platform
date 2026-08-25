import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import OrganizerEvents from "./pages/OrganizerEvents";
import EditEvent from "./pages/EditEvent";
import MyRegistrations from "./pages/MyRegistrations";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected routes */}

        <Route element={<ProtectedRoute />}>
          <Route element={<Navbar />}>

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/events"
              element={<Events />}
            />

            <Route
              path="/events/:id"
              element={<EventDetails />}
            />

            <Route
              path="/my-registrations"
              element={<MyRegistrations />}
            />

            <Route
              path="/organizer/events"
              element={<OrganizerEvents />}
            />

            <Route
              path="/organizer/events/create"
              element={<CreateEvent />}
            />

            <Route
              path="/organizer/events/:id/edit"
              element={<EditEvent />}
            />

          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
