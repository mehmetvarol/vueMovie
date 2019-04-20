<template>
  <section>
    <loader v-if="isLoading" />
    <section v-if="hasDetails">
      <backdrop-image :imageName="movie.backdrop_path" />
      <div class="container pt-5">
        <div class="row">
            <div class="col-sm-4">
              <poster :posterName="movie.poster_path" />
            </div>
            <div class="col-sm-8 details">
              <h2>{{movie.title}}</h2>
              <p> {{movie.overview}} </p>
            <div>Runtime: {{runtime}} </div>
            <div>Average Rating: {{movie.vote_average.toFixed(1)}}</div>
            <div>Production Company: {{movie.production_companies[0].name}}</div>
            <div>Release Date: {{movie.release_date}} </div>
            <h4 class="pt-3">Cast</h4>
              <img :src="castAvatar(person.profile_path)" v-for="person in movie.cast" class="cast-avatar" :key="person.id"/>
              <h4 class="pt-3">Trailers</h4>
              <a :href="trailer.url" v-for="trailer in trailers" target="_blank" class="trailer" :key="trailer.id">
                <div class="play-icon" />
                <img :src="trailer.thumbnail" class="thumbnail" />
              </a>
              <a :href="ticketsPath" class="btn btn-success tickets-button">Bilet Al</a>
            </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import Loader from './Loader';
import BackdropImage from './BackdropImage';
import Poster from './Poster';
export default {
  data() {
    return {
      hasDetails:false,
      isLoading: true,
    }
  },
 created(){
   this.movieId = this.$route.params.id;
   this.$store.dispatch('fetchMovieDetails', this.movieId).then(() => {
      this.isLoading = false;
      this.hasDetails = true;
    });
 },
 methods: {
    castAvatar(path) { // cast image'leri
      return `https://image.tmdb.org/t/p/w45${path}`;
    }
  },
 computed:{
   movieId(){
     return this.$route.params.id;
   },
   movie(){
     return this.$store.state.movieDetails[this.movieId]
   },
   posterPath() {
      return `https://image.tmdb.org/t/p/w500${this.details.poster_path}`;
    },
    trailers() {
      const trailers = [];
      this.movie.videos.results.forEach((video) => {
        if (video.type === 'Trailer') { // fragman trailer ise
          trailers.push({
            thumbnail: `https://i.ytimg.com/vi/${video.key}/sddefault.jpg`, // trailer img
            url: `https://youtube.com/watch?v=${video.key}`, // trailer url
          });
        }
      });
      return trailers;
    },
   runtime(){ // filmin saat olarak versiyonu
     const {runtime} = this.movie;
     const hours = Math.floor(runtime / 60);
     const minutes = runtime - (60 * hours);

     return `${hours}h ${minutes}m`;
   },
   ticketsPath(){
     return `/movie/${this.movieId}/tickets`
   }

 },
 components:{
   Loader,
   BackdropImage,
   Poster,

 }
}
</script>

<style>
.details{
  color:#ffff;
}
.cast-avatar {
  width: 45px;
  height: 45px;
  border-radius: 45px;
  border: 2px solid #FFF;
  margin-right: 10px;
}
.trailer {
  width: 150px;
  height: 110px;
  display: inline-block;
  margin-right: 20px;
  position: relative;
}
.trailer img{
  width: 100%;
  height: 100%;
}
.play-icon {
  background-image: url(http://f.acet.me/LXIk.png);
  background-size: 75px 75px;
  position: absolute;
  width: 75px;
  height: 75px;
  top: 18px;
  left: 36px;
}
.tickets-button{
  position: absolute;
  top: 0;
  right: 15px;
}
</style>
