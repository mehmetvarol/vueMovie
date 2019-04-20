<template>
  <section>
    <app-header />
    <loader v-if="isLoading" />   <!--ilk true olarak geliyor çalışacak. fethMovies dispatch edildikten sonra isLoading false oluyor ve duruyor. -->
    <section class="container py-5">
      <div class="card-deck" v-for="group in groupedMovies" :key="group.id"> <!-- Movieleri çektiğimiz kısım -->
        <movie
        v-for="movie in group"
        :key="movie.id"
        :movie="movie"
        />
      </div>
    </section>

  </section>
</template>

<script>
import AppHeader from './AppHeader';
import Loader from './Loader';
import Movie from './Movie';
import { mapGetters } from 'vuex'
export default {
  name:'Home',
  data() {
    return {
      isLoading:true,
    }
  },
  computed:{
      ...mapGetters([ // map() işlemi yapıyor. forEach()
        'movies',
        'groupedMovies',
      ])
  },
  components:{
    AppHeader,
    Loader,
    Movie,
  },
  created(){
    this.$store.dispatch('fetchMovies').then(() => { // fetchMovies dispatch(sevk etmek) edildi. action'a
      this.isLoading=false;
    });
  }
}
</script>

<style lang="scss">

</style>

