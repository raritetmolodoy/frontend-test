<template>
  <div>
    <div class="container">
      <div class="row mb-3">
        <div class="col">
          <h1>User list</h1>
        </div>
      </div>

      <div class="row">
        <div class="col col-md-8">
          <table class="table shadow-sm bg-white rounded">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th>First name</th>
                <th scope="col">Last name</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              <tr
                :class="{ 'bg-dark text-white': selectedUserId === user.id }"
                @click="selectUser(user.id)"
                v-for="user in users"
                :key="user.id"
              >
                <th>{{ user.id }}</th>
                <td>{{ user.first_name }}</td>
                <td>{{ user.last_name }}</td>
                <td>{{ user.email }}</td>
              </tr>
            </tbody>
          </table>

          <ul class="pagination">
            <li class="page-item" v-for="page in totalPages" :key="page">
              <router-link
                class="page-link"
                :to="`?page=${page}`"
                @click="selectPage(page)"
                exact-active-class="bg-primary text-white"
              >
                {{ page }}
              </router-link>
            </li>
          </ul>
        </div>

        <div class="col col-md-4">
          <user-details :id="selectedUserId" />
          <add-user-form />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserDetails from '@/components/UserDetails'
import AddUserForm from '@/components/AddUserForm'

export default {
  components: { UserDetails, AddUserForm },
  data: () => ({
    selectedUserId: null
  }),

  computed: {
    users() {
      return this.$store.state.users
    },
    totalPages() {
      return this.$store.state.totalPages
    },
    page() {
      return this.$route.query.page || 1
    }
  },

  watch: {
    page: {
      handler: 'fetchUsers',
      immediate: true
    }
  },

  methods: {
    selectUser(id) {
      this.selectedUserId = id
      this.formVisible2 = false
    },
    async fetchUsers() {
      this.selectedUserId = null
      await this.$store.dispatch('fetchUsers', { page: this.page })
    }
  }
}
</script>

<style lang="scss" scoped>
tr {
  &:hover {
    background: #f8f9fa;
    cursor: pointer;
  }
}
</style>
