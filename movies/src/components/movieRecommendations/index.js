import React from "react";
import { useQuery } from "react-query";
import { getMovieRecommendations } from "../../api/tmdb-api";
import { Typography, Card, CardMedia, CardContent, Box, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import Spinner from '../spinner';

const MovieRecommendations = ({ movie }) => {
  const { data, error, isLoading, isError } = useQuery(
    ["recommendations", { id: movie.id }],
    () => getMovieRecommendations(movie.id)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <Paper sx={{ padding: 2, marginTop: 2 }}>
      <Typography variant="h5" gutterBottom>
        Recommended Movies
      </Typography>
      
      <Box sx={{ 
        display: 'flex',
        gap: 2,
        overflowX: 'auto',
        padding: 1,
        '&::-webkit-scrollbar': {
          height: 8,
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f1f1f1',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
          borderRadius: 4,
        },
      }}>
        {data.results.slice(0, 10).map((movie) => (
          <Card key={movie.id} sx={{ 
            flex: '0 0 auto',
            width: 200,
            '&:hover': {
              transform: 'scale(1.02)',
              transition: 'transform 0.2s ease-in-out'
            }
          }}>
            <CardMedia
              component="img"
              height="300"
              image={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/movie-placeholder.png"
              }
              alt={movie.title}
            />
            <CardContent>
              <Typography variant="subtitle1">
                <Link 
                  to={`/movies/${movie.id}`} 
                  style={{ 
                    textDecoration: 'none', 
                    color: 'inherit' 
                  }}
                >
                  {movie.title}
                </Link>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rating: {movie.vote_average.toFixed(1)}⭐
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Paper>
  );
};

export default MovieRecommendations;