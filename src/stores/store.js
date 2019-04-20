import service from '../services/service';
const state = {
  movies: [],
  movieDetails: {},
  halls: {},
  movieTimes: {},
  ticketPrices: [],
  soldTickets: {},
  selectedMovieId: null,
  selectedTime: null,
  selectedTicketCounts: null,
  selectedMovieHallId: null,
  selectedSeats: null,
};

const getters = {
  movies(state) {
    return state.movies;
  },
  groupedMovies(state) {
    const grouped = [];
    state.movies.forEach((movie, index) => {
      if (index % 3 === 0) {
        grouped.push([]); // boş array pushla
      }
      grouped[grouped.length - 1].push(movie);
    });
    return grouped;
  },
};

const mutations = { // data değiştirmek istediğimizde mutation kullanılır.
  setMovies(state, movies) {
    state.movies = movies;
  },
  setMovieDetails(state, payload) {
    const { id, data } = payload;
    state.movieDetails[id] = data;
  },

  setTicketPrices(state, prices) {
    state.ticketPrices = prices;
  },
  setMovieTimes(state, data) {
    const { id, times } = data;
    state.movieTimes[id] = times;
  },
  setSelectedTime(state, time) {
    state.selectedTime = time;
  },
  setSelectedTicketOptions(state, tickets) {
    state.selectedTicketCounts = tickets;
  },
  setSelectedMovieHallId(state, id) {
    state.selectedMovieHallId = id;
  },
  setSeatingMap(state, data) {
    const { hallId, seating } = data;
    state.halls[hallId] = seating;
  },
  setSoldTickets(state, data) {
    const { movieId, time, tickets } = data;
    state.soldTickets[movieId] = state.soldTickets[movieId] || {};
    state.soldTickets[movieId][time] = tickets;
  },
  setSelectedMovieId(state, id) {
    state.selectedMovieId = id;
  },
  setSelectedSeats(state, seats) {
    state.selectedSeats = seats;
  },

};

const actions = { // vuex in içinde istek yapacak için kullanılır. Kısım service.js den istek yapılıyor. Asycn işlemlerinde kull.
  fetchMovies(context) {
    return service.fetchMovies().then((snapshot) => { // promise dönüyor. response kelimesi yerine firebase snapshot kelimesini kullanıyor.
      context.commit('setMovies', snapshot.val()); // commit kelimesi bir mutations yapmamızı sağlıyor
      // console.log(snapshot.val());
    });
  },
  fetchMovieDetails(context, id) {
    return service.fetchMovieDetails(id).then((snapshot) => {
      context.commit('setMovieDetails', { id, data: snapshot.val() });
    });
  },
  fetchTicketPrices(context) {
    return service.fetchTicketPrices().then((snapshot) => {
      context.commit('setTicketPrices', snapshot.val());
    });
  },
  fetchMovieTimes(context, id) {
    return service.fetchMovieTimes(id).then((snapshot) => {
      context.commit('setMovieTimes', { id, times: snapshot.val() });
    });
  },
  fetchTicketingInfo(context, id) {
    return context.dispatch('fetchTicketPrices').then(() => {
      return context.dispatch('fetchMovieTimes', id);
    });
  },
  fetchSeatMap(context, hallId) {
    return service.fetchSeating(hallId).then((snapshot) => {
      context.commit('setSeatingMap', { hallId, seating: snapshot.val() });
    });
  },
  fetchSoldTickets(context, { movieId, time }) {
    return service.fetchSoldTickets({ movieId, time }).then((snapshot) => {
      context.commit('setSoldTickets', { movieId, time, tickets: snapshot.val() });
    });
  },
  fetchSeatingInfo(context, { movieId, time, hallId }) {
    return context.dispatch('fetchSeatMap', hallId).then(() => {
      return context.dispatch('fetchSoldTickets', { movieId, time });
    });
  }

};

export default {
  state,
  getters,
  mutations,
  actions
}
