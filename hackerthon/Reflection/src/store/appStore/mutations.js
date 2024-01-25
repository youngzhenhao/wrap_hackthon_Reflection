export default {
    ADD_ACOUNTVUEX(state, countVuex) {
        state.countVuex = countVuex
    },
    setFiles(state, files) {
        state.Files = files
        // 将 Files 数组存储到 localStorage
        localStorage.setItem('Files', JSON.stringify(files))
      }
}