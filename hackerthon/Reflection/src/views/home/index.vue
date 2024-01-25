<template>
     <router-view >
          <keep-alive>
        <div class="sakura-main">
          <SakuraBigImgVue/>
          <Videolist/>
        </div>
          </keep-alive>
          </router-view>
  </template>
  
  <script>
  // 首页
  import SakuraBigImgVue from '../../components/SakuraBigImg.vue'
  import Videolist from '../video/Videolist.vue'

  
  export default {
    name: 'MovieHome',
    components: {
      SakuraBigImgVue,
      Videolist
    }
  }
  </script>
  