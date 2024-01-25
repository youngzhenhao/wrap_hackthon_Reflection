<template>
    <div class="vod-detail" style="margin: 20px 0; width: 90%; overflow: hidden;">
        <el-row class="video-play" style="margin: 40px  0">
            <myVideoPlay :src="videourl"/>
        </el-row>
    </div>
</template>

<script>
// 视频详情
import myVideoPlay from './VideoPlay.vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'MovDetail',

  setup(props) {
    const store = useStore()
    function assembleURL(hash) {
    return `http://localhost:8080/ipfs/${hash}`;
    }
    const videourl = assembleURL(props.hash)
    return {
        store,
        videourl
        }
  },

  components: {
    myVideoPlay
  },

  props: {
        hash: String
    },

}

</script>

<style>

div.vod-detail .el-row {
    margin: 0 0 10px;
}

span.des-name {
    line-height: 20px;
    margin: 0;
    color: #999;
    font-weight: 400;
    display: inline;
    text-align: left;
}

p.des-content {
    margin: 0;
    line-height: 20px;
    text-align: left;
    display: inline;
    color:black;
}


.el-col.vod-detail div.vod-detail {
    position: relative;
    width: 100%;
    height: 0;
    overflow: hidden;
    padding-bottom: 130%;
}

.el-col.vod-detail div img {
    width: 95%;
    height: auto;
    display: block;
    margin: 0 auto;
    object-fit: cover;
}

.el-button.vod-play-url.active {
  background-color: rgb(36, 184, 242);
  color: white;
  border-radius: 4px;
}

</style>