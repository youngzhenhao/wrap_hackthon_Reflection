<template>
  <div >
    <form @submit.prevent="onSubmit" class="uploadform">
      <input type="file" ref="file" v-on:change="handleFileUpload" accept="video/mp4"/>
      <button type="submit">提交</button>
    </form>
    <Filelist/>

  </div>
</template>

<script>
import { create } from 'ipfs-http-client'
import { ref, reactive } from 'vue'
import Filelist from './Filelist.vue'


export default {
  components:{
    Filelist  
  },
  setup() {
    
    const file = ref(null)

    const handleFileUpload = event => {
      file.value = event.target.files[0]
      console.log(file.value);
    }


    const onSubmit = async () => {
      const ipfs = await create({ url: 'http://localhost:5001' })
      const reader = new FileReader()

      reader.onloadend = async () => {

        const result = await ipfs.add(reader.result)
      }

      reader.readAsArrayBuffer(file.value)
    }

    return {
      file,
      handleFileUpload,
      onSubmit
    }
  }
}
</script>

<style scoped>
.uploadform{
  display: grid;
  justify-content: center;
  width: 600px;
  margin: 10px auto;
  border: 1px solid #e2e7eb;

}
  button{
    margin: 10px auto;
    width: 100px;
    height: 30px;
    border: none;
    color: white;
    border-radius: 5px;
    background-color: rgb(84, 174, 247);
  }
</style>