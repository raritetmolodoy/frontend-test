<template>
  <div class="card border-0 shadow-sm">
    <div class="card-header">User details</div>
    <div v-if="id">
      <div class="card-body">
        <div class="card-title">
          <div class="row align-items-center justify-content-center">
            <div class="col col-3">
              <img :src="selectedUser.avatar" class="avatar-img" alt="avatar" />
            </div>
            <div class="col col-9">
              <template v-if="!formVisible">
                <h3 class="m-0">
                  {{ selectedUser.first_name }}
                  {{ selectedUser.last_name }}
                </h3>
                <div class="text-muted">{{ selectedUser.email }}</div>
              </template>
              <template v-else>
                <input
                  v-model="editFirstname"
                  type="text"
                  placeholder="First name"
                  class="form-control form-control-sm mb-2"
                />
                <input
                  v-model="editLastName"
                  type="text"
                  placeholder="Last name"
                  class="form-control form-control-sm mb-2"
                />
                <input
                  v-model="editEmail"
                  type="text"
                  placeholder="Email"
                  class="form-control form-control-sm "
                />
              </template>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col col-9">
              <button
                @click="prepareEditForm()"
                v-if="!formVisible"
                class="btn btn-dark mr-2"
              >
                Edit
              </button>
              <button
                @click="editUser()"
                v-else
                :disabled="editPermited"
                class="btn btn-success mr-2"
              >
                Confirm edit
              </button>
              <button @click="deleteUser" class="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="d-flex justify-content-center align-items-center text-muted p-5"
    >
      Select user
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data: () => ({
    formVisible: false,
    editFirstname: null,
    editLastName: null,
    editEmail: null
  }),

  watch: {
    id() {
      this.formVisible = false
    }
  },

  computed: {
    selectedUser() {
      return this.$store.state.users.find(x => x.id === this.id)
    },
    editPermited() {
      return !this.editFirstname || !this.editLastName || !this.editEmail
    }
  },

  methods: {
    deleteUser() {
      this.$store.dispatch('deleteUser', { id: this.id })
      this.$parent.selectedUserId = null
    },
    prepareEditForm() {
      this.formVisible = true
      this.editFirstname = this.selectedUser.first_name
      this.editLastName = this.selectedUser.last_name
      this.editEmail = this.selectedUser.email
    },
    async editUser() {
      await this.$store.dispatch('editUser', {
        id: this.id,
        firstName: this.editFirstname,
        lastName: this.editLastName,
        email: this.editEmail
      })
      this.formVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-img {
  border-radius: 50%;
  width: 100%;
  text-align: center;
}
</style>
