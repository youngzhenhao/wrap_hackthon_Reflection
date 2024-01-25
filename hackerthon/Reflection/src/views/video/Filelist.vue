<template>
<strong class="fLtittle">已提交的文件:</strong>
  <el-row class="filelist">
    <el-col v-for="file in files" :key="file.hash">
      <el-icon><CircleCheckFilled /></el-icon>：<span>{{ file.hash }}</span>  大小：<span>({{ file.size }})</span>
    </el-col>
  </el-row>
</template>

<script>
import { ref, onMounted } from 'vue'
import { create } from 'ipfs-http-client'

export default {
  setup() {
    function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
    const files = ref([])
    async function listPins() {
        const ipfs = await create({ url: 'http://localhost:5001' })
        const pins = []
  
        for await (const pin of ipfs.pin.ls({ type: 'recursive' })) {
          pins.push(pin.cid.toString())
        }
        console.log('pins:', pins);
        return pins
      }
  
      listPins()
        .then(async(pins) => {await getStats(pins)
          console.log('files:', files);
      }
        )
        .catch(error => console.error(error))
    async function getStats(hashes){
      const ipfs = await create({ url: 'http://localhost:5001' })
      for (const hash of hashes) {
        const file = await ipfs.files.stat(`/ipfs/${hash}`)
        console.log('file:',file);
        files.value.push({ name: file.name, size: formatBytes(file.size), hash })
      }
}
    return {
      files
    }
  }
}
</script>
<style scoped>
.fLtittle{
  display: flex;
  width: 1000px;
  justify-content: center;
  background-color:#e2e7eb ;
}
.el-row{
  width: 1000px;
  border: 1px solid #e2e7eb;
  background-color: #f9fbfc;
}
.el-col{
  flex: none;
  margin-left: 0;
}

</style>