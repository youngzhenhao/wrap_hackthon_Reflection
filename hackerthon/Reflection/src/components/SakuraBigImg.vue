<template>
  <el-carousel ref="carousel" :height="bannerHeight/2+'px'" style="margin: 0 auto; width: 100%; border-radius: 4px" indicator-position="outside">
    <el-carousel-item v-for="(i, index) in videos" :key="i">
      <video :src="i" style="width: 100%" ref="video" @loadedmetadata="videoLoad" @ended="videoEnded(index)" autoplay muted loop></video>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: "SakuraBigImg",
  props: {
    movtype: Number
  },
  setup() {
    return {
      // movieList
    }
  },
  data() {
    return {
      bannerHeight: "",
      videos: [
        "src/assets/bigImg/b1.mp4",
        "src/assets/bigImg/b2.mp4",
        "src/assets/bigImg/b3.mp4",
        "src/assets/bigImg/b4.mp4"
      ]
    }
  },
  mounted() {
    this.videoLoad();
    window.addEventListener('resize', () => {
      this.bannerHeight = this.$refs.video[0].videoHeight;
      this.videoLoad();
    }, false)
  },
  methods: {
    videoLoad() {
      this.$nextTick(() => {
        this.bannerHeight = this.$refs.video[0].videoHeight;
        console.log(this.$refs.video[0].videoHeight);
      })
    },
    videoEnded(index) {
      if (index < this.videos.length - 1) {
        this.$refs.carousel.set(index + 1);
      } else {
        this.$refs.carousel.set(0);
      }
    },
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: white;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: white;
}
</style>
