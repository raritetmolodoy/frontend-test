<template>
  <div class="card mt-3 shadow-sm border-0">
    <div class="card-body">
      <template v-if="formVisible">
        <div>
          <input
            type="text"
            class="form-control mb-3"
            placeholder="First name"
            v-model="newUserFirstname"
          />
          <input
            type="text"
            class="form-control mb-3"
            placeholder="Last name"
            v-model="newUserLastname"
          />
          <input
            type="text"
            placeholder="Email"
            class="form-control mb-3"
            v-model="newUserEmail"
          />
        </div>
        <hr />
      </template>
      <div class="d-flex">
        <button
          @click="formVisible = true"
          class="btn btn-success flex-fill mr-2"
          v-if="!formVisible"
        >
          Add user
        </button>
        <button
          @click="addUser()"
          class="btn  btn-primary flex-fill mr-2"
          v-else
          :disabled="additionPermited"
        >
          Confirm add
        </button>

        <button
          class="btn btn-secondary"
          v-if="formVisible"
          @click="formVisible = false"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    newUserFirstname: null,
    newUserLastname: null,
    newUserEmail: null,
    formVisible: false
  }),
  computed: {
    additionPermited() {
      return (
        !this.newUserFirstname || !this.newUserLastname || !this.newUserEmail
      )
    }
  },
  methods: {
    addUser() {
      this.$store.dispatch('addUser', {
        firstName: this.newUserFirstname,
        lastName: this.newUserLastname,
        email: this.newUserEmail
      })
    }
  }
}
</script>
