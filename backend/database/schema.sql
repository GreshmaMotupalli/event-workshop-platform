-- ============================================
-- USERS
-- ============================================

CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'attendee',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT users_role_check
        CHECK (role IN ('attendee', 'organizer'))
);


-- ============================================
-- EVENTS
-- ============================================

CREATE TABLE events (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    title VARCHAR(200) NOT NULL,
    description TEXT,

    category VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,

    event_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,

    capacity INTEGER NOT NULL,

    organizer_id INTEGER NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT events_capacity_check
        CHECK (capacity > 0),

    CONSTRAINT events_time_check
        CHECK (end_time > start_time),

    CONSTRAINT events_organizer_fk
        FOREIGN KEY (organizer_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


-- ============================================
-- REGISTRATIONS
-- ============================================

CREATE TABLE registrations (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    user_id INTEGER NOT NULL,
    event_id INTEGER NOT NULL,

    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT registrations_user_fk
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT registrations_event_fk
        FOREIGN KEY (event_id)
        REFERENCES events(id)
        ON DELETE CASCADE,

    CONSTRAINT unique_user_event
        UNIQUE (user_id, event_id)
);