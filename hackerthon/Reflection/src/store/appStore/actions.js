export default {
    ADD_ACOUNTVUEX(store, countVuex) {
        store.commit('ADD_ACOUNTVUEX', countVuex)
    },
    updateFiles({ commit }, files) {
        commit('setFiles', files)
      }
}