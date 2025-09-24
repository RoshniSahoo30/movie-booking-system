# Movie Booking System

A full-stack web application, similar to BookMyShow, that allows users to browse movies, select showtimes at various cinemas, book seats, and manage their bookings. This project was built to demonstrate proficiency in creating a robust backend API, an interactive frontend, and a complete user authentication flow.

## Features

* **User Authentication**: Secure user registration and login using JWT (JSON Web Tokens).
* **Cinema & Show Browsing**: Users can view all available cinemas and see a list of movies and showtimes for each.
* **Interactive Seat Selection**: A visual 10x10 seat map where users can view available, booked, and selected seats.
* **Booking Management**: Users can book up to 6 seats for a show and view their entire booking history.
* **Booking Cancellation**: A bonus feature allowing users to cancel their confirmed bookings, which makes the seats available again.

## Tech Stack

### Backend
* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB with Mongoose ODM
* **Authentication**: JSON Web Tokens (jsonwebtoken)
* **Password Hashing**: bcryptjs

### Frontend
* **Library**: React (bootstrapped with Vite)
* **Styling**: Tailwind CSS
* **Routing**: React Router
* **State Management**: React Context API
* **API Client**: Axios

---

## Setup and Installation

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

* Node.js (v18 or later)
* npm (or yarn)
* MongoDB (A local instance or a free cloud instance from MongoDB Atlas)

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd movie-booking-system
    ```

2.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Create an environment file:**
    Create a `.env` file in the `backend` directory and add the following variables.

    ```
    PORT=5000
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret_key>
    ```

5.  **Run the server:**
    ```bash
    npm run dev
    ```
    The backend server will start on `http://localhost:5001`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    # From the root project directory
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the client:**
    ```bash
    npm run dev
    ```
    The React development server will start, typically on `http://localhost:5173`.

---

## Database Schema

The database consists of six main collections to manage the application's data and relationships.

* **Users**: Stores user information.
    * `name` (String): The user's full name.
    * `email` (String, Unique): The user's email, used for login.
    * `password` (String): The user's hashed password.

* **Cinemas**: Stores information about each cinema location.
    * `name` (String): The name of the cinema (e.g., "PVR Cinemas").
    * `location` (String): The address of the cinema.

* **Screens**: Stores information about individual screens within a cinema.
    * `screenNumber` (Number): The screen number.
    * `cinema` (ObjectId, Ref: 'Cinema'): A reference to the cinema this screen belongs to.

* **Movies**: Stores details about each movie.
    * `title` (String): The title of the movie.
    * `description` (String): A brief synopsis.
    * `posterUrl` (String): A URL to the movie's poster image.

* **Shows**: The central model that connects a movie, a screen, and a time.
    * `movie` (ObjectId, Ref: 'Movie'): The movie being shown.
    * `screen` (ObjectId, Ref: 'Screen'): The screen where the movie is being shown.
    * `startTime` (Date): The specific date and time of the show.
    * `bookedSeats` (Array of Strings): A list of seats that are booked for this show (e.g., `["A1", "C5"]`).

* **Bookings**: Represents a user's transaction.
    * `user` (ObjectId, Ref: 'User'): The user who made the booking.
    * `show` (ObjectId, Ref: 'Show'): The show that was booked.
    * `seats` (Array of Strings): The specific seats the user booked.