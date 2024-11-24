# React Movie Project

## Overview
This repository contains a ReactJS application that extends the functionality of a Movies Fan app. The app allows users to explore and interact with movie data from the TMDB (The Movie Database) API.

## Features
- Added support for "Trending Movies", "Top Rated Movies", and "Now Playing" movie lists
- Implemented parameterized endpoints for movie recommendations, credits, and actor/person details
- Implemented caching with react-query for static and parameterized endpoints
- Added new filtering and sorting options (e.g. filter by genre, sort by rating)
- Integrated pagination for movie lists
- Developed responsive UI layout using Material UI components
- Implemented third-party authentication with Firebase
- Added a "Must-Watch" list and "Favorite Movies" functionality with Firebase persistence
- Created actor profile pages with biography and filmography

## Setup Requirements
To run the app locally, you'll need to:
1. Obtain a TMDB API key and add it to the project's environment variables
2. Set up a Firebase project and configure the app with the necessary credentials

## API Endpoints
In addition to the endpoints used in the original Movies Fan app, the following new endpoints were implemented:

- Trending Movies: `/trending/movie/week`
- Top Rated Movies: `/movie/top_rated`
- Now Playing Movies: `/movie/now_playing`
- Movie Recommendations: `/movie/{id}/recommendations`
- Movie Credits: `/movie/{id}/credits`
- Person Details: `/person/{id}`

## Routing
The app supports the following new routes:

- `/trending-movies`: Displays the list of trending movies
- `/top-rated-movies`: Displays the list of top-rated movies
- `/now-playing-movies`: Displays the list of movies currently playing
- `/movie/{id}/recommendations`: Displays movie recommendations for the given movie ID
- `/person/{id}`: Displays details for the given person (actor) ID

## Independent Learning
The following technologies and techniques were researched and implemented independently:

- **Firebase Authentication**: Integrated third-party authentication using Firebase to allow users to sign up and log in to the app.
- **Firebase Firestore**: Used Firebase's Firestore database to persist user data, such as favorite movies and must-watch lists.
- **Material UI**: Utilized the Material UI library to develop a responsive and visually appealing user interface for the app.

References:
- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [Firebase Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Material UI Documentation](https://material-ui.com/getting-started/installation/)
