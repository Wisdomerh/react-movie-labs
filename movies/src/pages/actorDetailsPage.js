import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getPersonDetails, getPersonMovieCredits } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import { Typography, Card, CardMedia, CardContent, Paper, IconButton, Box } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";

const ActorDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: actor, error: actorError, isLoading: actorLoading } = useQuery(
    ["person", { id: id }],
    () => getPersonDetails(id)
  );

  const { data: credits, error: creditsError, isLoading: creditsLoading } = useQuery(
    ["personMovies", { id: id }],
    () => getPersonMovieCredits(id)
  );

  if (actorLoading || creditsLoading) {
    return <Spinner />;
  }

  if (actorError || creditsError) {
    return <h1>{actorError?.message || creditsError?.message}</h1>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      {/* Back Button */}
      <IconButton 
        onClick={() => navigate(-1)} 
        sx={{ 
          position: 'fixed',
          left: 16,
          top: 80,
          backgroundColor: 'white',
          boxShadow: 2,
          '&:hover': {
            backgroundColor: '#f5f5f5',
          }
        }}
        aria-label="go back"
      >
        <ArrowBackIcon />
      </IconButton>

      {/* Main Content */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        gap: 3,
        marginTop: 4
      }}>
        {/* Actor Profile */}
        <Box sx={{ flex: '0 0 auto', maxWidth: { xs: '100%', md: '300px' } }}>
          <Card>
            <CardMedia
              component="img"
              image={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                  : "/profile-placeholder.jpg"
              }
              alt={actor.name}
              sx={{ width: '100%', height: 'auto' }}
            />
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {actor.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Born: {new Date(actor.birthday).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" gutterBottom>
                From: {actor.place_of_birth}
              </Typography>
              {actor.deathday && (
                <Typography variant="body1" gutterBottom>
                  Died: {new Date(actor.deathday).toLocaleDateString()}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Box>

        {/* Biography and Filmography */}
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h5" gutterBottom>
              Biography
            </Typography>
            <Typography variant="body1" paragraph>
              {actor.biography}
            </Typography>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              Known For
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 2,
              justifyContent: { xs: 'center', sm: 'flex-start' }
            }}>
              {credits.cast
                .sort((a, b) => b.popularity - a.popularity)
                .slice(0, 6)
                .map((movie) => (
                  <Card key={movie.id} sx={{ width: { xs: '100%', sm: '45%', md: '30%' }, maxWidth: '200px' }}>
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
                        <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          {movie.title}
                        </Link>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {movie.character}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default ActorDetailsPage;