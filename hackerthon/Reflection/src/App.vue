<template>
  <div class="common-layout">
    <el-container >
      <el-header style="width: 100%; position: sticky; border-bottom: 1px solid #dcdfe6; top: 0; left: 0; z-index:1000; padding: 0">
      <div class="sakura-header">
        <SakuraMenu/>
      </div>
      </el-header>
      <el-main style="overflow: hidden; top: 0; left: 0; padding: 0;">
       
        <router-view />

         
      </el-main>
      <el-footer style="padding: 0">
        <FooterVue/>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import SakuraMenu from './components/SakuraMenu.vue'
import FooterVue from './components/Footer.vue'
import MovDetailPageVue from './views/MovDetailPage.vue'
import LoginVue from './views/Login.vue'
import Videolist from './views/video/Videolist.vue'
import SakuraBigImgVue from './components/SakuraBigImg.vue'



export default {
  name: 'App',
  components: {
    SakuraMenu,
    FooterVue,
    MovDetailPageVue,
    LoginVue,
    Videolist,
    SakuraBigImgVue
  },
  
  computed: {
    key() {
      // 只要保证 key 唯一性就可以了，保证不同页面的 key 不相同
      // console.log(this.$route.fullPath);
      return this.$route.fullPath
    }
  },
}
</script>
