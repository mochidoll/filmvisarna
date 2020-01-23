<template>
  <div>
    
    <button @click="addScreening">Create Screening</button>
  </div>
</template>

<script>
import {db} from '@/firebase/firebase'

export default {
  data() {
    return {
      saloons: ['DirHKUktU88JP8YqHe7D', 'XPiy5LjceA4IfWIQtyMb'],
      movies: ['DLUNs0mf9xBOM3WMlNJM', 'Jo0YfClDdcTI6m09euzm', 'eGQqsOGYaeNrhmqrAtii', 'o7kxrTjOsTt9uMb4otFV', 'qVFr315KPfJLsvz5pNuS'],
      dates: ['01/01/2020'],
      times: ['12:00:00']
    }
  },

  methods: {
    addScreening() {
      db.collection('screenings').add({
        auditoriumId: this.saloons[0],
        movieId: this.movies[0],  
      })
      alert('Pushing done!')
    }
  }
}

</script>

<style>

</style>