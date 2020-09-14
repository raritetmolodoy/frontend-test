<template>
  <nav
    class="navbar navbar-expand navbar-dark bg-dark mb-3 justify-content-between shadow-sm"
  >
    <a class="navbar-brand" href="/">Frontend test</a>
    <div class="navbar-nav">
      <template v-if="userAuthorized">
        <a class="text-white nav-link" href="#">{{ userEmail }}</a>
        <button class="nav-link signOut btn btn-link" @click="signOut()">
          Sign out
        </button>
      </template>
      <router-link v-else class="nav-link" :to="{ name: 'login' }">
        Sign in
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    userEmail() {
      return this.$store.state.currentUser?.email
    },
    userAuthorized() {
      return this.$store.state.currentUser?.token
    }
  },

  methods: {
    signOut() {
      this.$store.dispatch('signOut')
    }
  }
}
</script>

<style>
.signOut {
  cursor: pointer;
}
</style>
