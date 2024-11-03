import React, { useState, useEffect } from "react";
import { useAuth } from "./authContext";
import { getDatabase, ref, set, get } from "firebase/database";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [myReviews, setMyReviews] = useState({});
  const [mustWatch, setMustWatch] = useState([]);
  const { currentUser } = useAuth();
  const db = getDatabase();

  useEffect(() => {
    const loadUserData = async () => {
      if (currentUser) {
        console.log("Loading data for user:", currentUser.uid);
        
        try {
          const favRef = ref(db, `users/${currentUser.uid}/favorites`);
          const favSnapshot = await get(favRef);
          
          if (favSnapshot.exists()) {
            setFavorites(favSnapshot.val());
            console.log("Loaded favorites:", favSnapshot.val());
          }

          const watchRef = ref(db, `users/${currentUser.uid}/mustWatch`);
          const watchSnapshot = await get(watchRef);
          
          if (watchSnapshot.exists()) {
            setMustWatch(watchSnapshot.val());
            console.log("Loaded must-watch:", watchSnapshot.val());
          }

          const reviewsRef = ref(db, `users/${currentUser.uid}/reviews`);
          const reviewsSnapshot = await get(reviewsRef);
          
          if (reviewsSnapshot.exists()) {
            setMyReviews(reviewsSnapshot.val());
            console.log("Loaded reviews:", reviewsSnapshot.val());
          }
        } catch (error) {
          console.error("Error loading user data:", error);
        }
      } else {
        setFavorites([]);
        setMustWatch([]);
        setMyReviews({});
      }
    };

    loadUserData();
  }, [currentUser, db]);

  const addToFavorites = async (movie) => {
    if (!currentUser) return;

    try {
      let newFavorites = [...favorites];
      if (!favorites.includes(movie.id)) {
        newFavorites.push(movie.id);
        
        const favRef = ref(db, `users/${currentUser.uid}/favorites`);
        await set(favRef, newFavorites);
        
        setFavorites(newFavorites);
        console.log("Movie added to favorites");
      }
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  const removeFromFavorites = async (movie) => {
    if (!currentUser) return;

    try {
      const newFavorites = favorites.filter(
        (mId) => mId !== movie.id
      );
      
      const favRef = ref(db, `users/${currentUser.uid}/favorites`);
      await set(favRef, newFavorites);
      
      setFavorites(newFavorites);
      console.log("Movie removed from favorites");
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const addToMustWatch = async (movie) => {
    if (!currentUser) return;

    try {
      let newMustWatch = [...mustWatch];
      if (!mustWatch.includes(movie.id)) {
        newMustWatch.push(movie.id);
        
        const watchRef = ref(db, `users/${currentUser.uid}/mustWatch`);
        await set(watchRef, newMustWatch);
        
        setMustWatch(newMustWatch);
        console.log("Movie added to must-watch");
      }
    } catch (error) {
      console.error("Error adding to must-watch:", error);
    }
  };

  const addReview = async (movie, review) => {
    if (!currentUser) return;

    try {
      const updatedReviews = {
        ...myReviews,
        [movie.id]: review
      };
      
      const reviewRef = ref(db, `users/${currentUser.uid}/reviews/${movie.id}`);
      await set(reviewRef, review);
       
      setMyReviews(updatedReviews);
      console.log("Review added");
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        mustWatch,
        addToMustWatch,
        addReview,
        myReviews,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;