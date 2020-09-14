<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col col-sm-10 col-md-7 col-lg-6 col-xl-5">
        <div class="card p-3 shadow-sm border-0">
          <div class="card-body">
            <h2 class="mb-4 text-center">Sign in</h2>
            <form method="post" @submit.prevent="signIn()">
              <div>
                <div class="form-group">
                  <label for="username">
                    Email
                  </label>
                  <input
                    v-model="email"
                    type="text"
                    id="username"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input
                    v-model="password"
                    type="password"
                    id="password"
                    class="form-control"
                  />
                </div>
                <button class="mt-4 btn btn-primary btn-block btn-lg">
                  Sign in
                </button>
                <div v-if="error" class="alert alert-danger mt-3">
                  {{ error }}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: null,
    password: null,
    error: null
  }),

  methods: {
    async signIn() {
      this.error = null

      const result = await this.$store.dispatch('signIn', {
        email: this.email,
        password: this.password
      })

      if (result.error) {
        this.error = result.errorMsg
        return
      }

      this.$router.push({ name: 'index' })
    }
  }
}
</script>

<style></style>
