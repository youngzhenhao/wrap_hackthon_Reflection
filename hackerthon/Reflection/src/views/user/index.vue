<template>
    
</template>
  
  <script>
  // 首页
  import MovLimitCardVue from '../../components/MovLimitCard.vue'
  import { useRouter } from 'vue-router'

  export default {
    name: 'MovieHome',
    components: {
      MovLimitCardVue
    },
    setup(){
        const router = useRouter()
        const upload =  () =>{
        router.push('/upload')
        }
        return{
            upload
        }
    }
   
  }

  
  </script>
  