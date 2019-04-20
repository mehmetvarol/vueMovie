<template>
   <div class="card">
     <router-link :to="movieDetailsPath"> <!-- router-link  :to"" router işlemi yapmak için değeri computed propertyden alır -->
      <!-- <img class="card-img-top"
      :src="posterPath"
      :alt="movie.original_title"> -->
      <poster class="card-img-top" :posterName="movie.poster_path" :alt="movie.original_title"/> <!-- movie.poster_path bir component işlemi (Poster.vue)-->
     </router-link>
    <div class="card-body">
      <h5 class="card-title">{{movie.original_title}}</h5> <!--// Detayalar - film başlığı -->
      <p class="card-text">{{movie.overview}}</p>
    </div>
    <div class="card-footer">
      <small class="text-muted">Averin rating: {{movie.vote_average.toFixed(1)}}</small>
    </div>
  </div>
</template>

<script>
import Poster from './Poster';
export default {
  name:'Movie',
  props:{
    movie:{
      type:Object,
      required:true,
    }
  },
  components:{
    Poster,
  },
  computed:{
    movieDetailsPath(){
      return `/movie/${this.movie.id}`;
    }
  }
}
</script>
<style lang="scss">
.card-deck{
  .card{
    min-width: 250px;
    margin-bottom: 30px;
  }
}
</style>
