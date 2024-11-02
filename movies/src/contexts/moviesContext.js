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
    if (currentUser) {
      const userFavoritesRef = ref(db, `users/${currentUser.uid}/favorites`);
      const userMustWatchRef = ref(db, `users/${currentUser.uid}/mustWatch`);

      get(userFavoritesRef).then((snapshot) => {
        if (snapshot.exists()) {
          setFavorites(snapshot.val());
        }
      });

      get(userMustWatchRef).then((snapshot) => {
        if (snapshot.exists()) {
          setMustWatch(snapshot.val());
        }
      });
    }
  }, [currentUser, db]);

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)) {
      newFavorites = [...favorites, movie.id];
    } else {
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites);
    if (currentUser) {
      set(ref(db, `users/${currentUser.uid}/favorites`), newFavorites);
    }
  };

  const removeFromFavorites = (movie) => {
    const newFavorites = favorites.filter((mId) => mId !== movie.id);
    setFavorites(newFavorites);
    if (currentUser) {
      set(ref(db, `users/${currentUser.uid}/favorites`), newFavorites);
    }
  };

  const addToMustWatch = (movie) => {
    let newMustWatch = [...mustWatch];
    if (!mustWatch.includes(movie.id)) {
      newMustWatch.push(movie.id);
    }
    setMustWatch(newMustWatch);
    if (currentUser) {
      set(ref(db, `users/${currentUser.uid}/mustWatch`), newMustWatch);
    }
  };

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
    if (currentUser) {
      set(ref(db, `users/${currentUser.uid}/reviews/${movie.id}`), review);
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
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;