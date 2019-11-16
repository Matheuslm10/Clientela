import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuarioLogado: {
      nome: "Mathes Machado",
      email: "joao@gmail.com"
    },
    snackbar: {
      show: false,
      text: '',
      color: 'info'
    }

  },
  mutations: {
    showSnackBar(state, payload) {
      state.snackbar.show = true,
      state.snackbar.text = payload.text
      state.snackbar.color = payload.color
    },
    closeSnackBar(state) {
      state.snackbar.show = false
    }
  },
  actions: {
    showSuccessSnackBar({commit}, mensagem) {
      commit('showSnackBar', { text: mensagem, color: 'success' })
      setTimeout(() => {
        commit('closeSnackBar')
      }, 3000)
    },
    closeSnackBar({commit}){
      commit('closeSnackBar')
    }
  }
})
