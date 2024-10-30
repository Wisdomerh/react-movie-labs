import React from "react";
import { useQuery } from "react-query";
import { getMovieCredits } from "../../api/tmdb-api";
import { Paper, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
import Spinner from '../spinner';
import { Link } from "react-router-dom";

const MovieCredits = ({ movie }) => {
  const { data, error, isLoading, isError } = useQuery(
    ["credits", { id: movie.id }],
    () => getMovieCredits(movie.id)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <Paper sx={{ padding: 2, margin: 2 }}>
      <Typography variant="h5" gutterBottom>
        Cast
      </Typography>
      <Grid container spacing={2}>
        {data.cast.slice(0, 6).map((actor) => (
          <Grid item xs={6} md={2} key={actor.id}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="200"
                image={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                    : "/profile-placeholder.jpg"
                }
                alt={actor.name}
              />
              <CardContent>
                <Typography variant="subtitle1" component="div">
                  <Link to={`/person/${actor.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {actor.name}
                  </Link>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {actor.character}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default MovieCredits;