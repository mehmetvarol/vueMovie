<template>
  <section>
    <app-header />
    <loader v-if="isLoading" />
    <section class="container py-5">
      <div class="card-deck" v-for="group in groupedMovies" :key="group.id">
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
      ...mapGetters([
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
    this.$store.dispatch('fetchMovies').then(() => {
      this.isLoading=false;
    });
  }
}
</script>

<style lang="scss">

</style>
