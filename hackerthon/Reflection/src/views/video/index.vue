<template>
    <el-container>
    <el-aside width="200px">
      <el-menu>
        <el-menu-item index="1">
          <el-button class="uploadbtn" type="primary" @click="upload">投稿</el-button>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <div class="uploadnote">
        <h3>欢迎投稿</h3>
        <p>Reflection使用的是IPFS做存储与下载，所有上传的视频都会被发送给IPFS服务器。</p>
        <strong>当你删除视频时，如果视频已经被保存在了其他节点中，那么其他节点仍然能再IPFS服务器中看到你的视频。</strong>
      </div>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
  
  <script>
  // 首页

  import { useRouter } from 'vue-router'

  export default {
    name: 'MovieHome',
    setup(){
        const router = useRouter()
        const upload =  () =>{
        router.push('/video/upload')
        }
        return{
            upload
        }
    }
   
  }

  
  </script>
<style>
.uploadbtn{
  margin: 20px auto;
}
.uploadnote{
  width: 1200px;
  margin: 5px auto;
}
</style>
  