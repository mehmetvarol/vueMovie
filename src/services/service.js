// servicesjs -> Backend'e istek yapan, data yı çeken, data isteklerini çeken kısım
export default {
  fetchMovies() {
    return firebase.database().ref('/movies').once('value');
  },
  fetchMovieDetails(id) {
    return firebase.database().ref(`/movieDetails/${id}`).once('value');
  },
}

