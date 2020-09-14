import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    totalPages: null,
    currentUser: null
  },

  mutations: {
    setUsers(state, payload) {
      state.users = payload
    },
    setTotalPages(state, payload) {
      state.totalPages = payload
    },
    deleteUser(state, payload) {
      const indexOfDeletedUser = state.users.findIndex(x => x.id === payload.id)
      state.users.splice(indexOfDeletedUser, 1)
    },
    setCurrentUser(state, payload) {
      state.currentUser = payload
    },
    addUserToList(state, payload) {
      state.users.push(payload)
    },
    setEditedUser(state, payload) {
      const user = state.users.find(x => x.id === payload.id)
      user.email = payload.email
      user.first_name = payload.first_name
      user.last_name = payload.last_name
    }
  },

  actions: {
    async fetchUsers(store, payload) {
      const users = await axios.get(
        `https://reqres.in/api/users?page=${payload.page}`
      )
      store.commit('setUsers', users.data.data)
      store.commit('setTotalPages', users.data.total_pages)
    },
    async deleteUser({ commit }, payload) {
      await axios.delete(`https://reqres.in/api/users/${payload.id}`)

      //  fetch users again here. mock instead:
      commit('deleteUser', { id: payload.id })
    },

    async signIn({ commit }, payload) {
      try {
        const response = await axios.post(`https://reqres.in/api/login`, {
          email: payload.email,
          password: payload.password
        })
        commit('setCurrentUser', {
          email: payload.email,
          token: response.data.token
        })
        localStorage.setItem('access-token', response.data.token)
        return response
      } catch {
        return {
          error: true,
          errorMsg: 'Incorrect email or password! Try again'
        }
      }
    },

    signOut({ commit }) {
      //mock
      commit('setCurrentUser', null)
    },

    async addUser({ commit }, payload) {
      const user = await axios.post(`https://reqres.in/api/users`, {
        first_name: payload.firstName,
        last_name: payload.lastName,
        email: payload.email
      })
      commit('addUserToList', user.data)
    },

    async editUser({ commit }, payload) {
      const data = {
        first_name: payload.firstName,
        last_name: payload.lastName,
        email: payload.email
      }
      const edited = await axios.patch(
        `https://reqres.in/api/users/${payload.id}`,
        data
      )
      // fetch here to update data. mock:
      commit('setEditedUser', { id: payload.id, ...data })
      console.log(edited)
    }
  }
})
