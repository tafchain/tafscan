<template>
  <v-snackbar v-model="snackbar">
    {{ msg }}
    <template v-slot:action="{ attrs }">
      <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="$store.commit('TOGGLE_SNACKBAR', { bool: false })"
      >
        <v-icon light>
          mdi-close
        </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
name: "vMsg",
  data: ()=> ({
    msg: '',
    snackbar: false
  }),
  watch: {
    '$store.state.snackbar': {
      handler(cur) {
        this.snackbar = cur.isShow
        this.msg = cur.msg
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
