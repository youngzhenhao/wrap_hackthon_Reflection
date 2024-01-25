<template>
  <MovDetail :hash="hash"/>
  <el-backtop :right="50" :bottom="80" />
</template>

<script>
// 详情页
import MovDetail from '../components/MovDetail.vue'

export default {
  name: 'MovDetailPage',
  props: {
        hash: String
    },
  components: {
    MovDetail
  },
  setup(props){
    const hash = props.hash
    console.log('hash: ' , props);
    return {
      hash
    }
  }
}
</script>
