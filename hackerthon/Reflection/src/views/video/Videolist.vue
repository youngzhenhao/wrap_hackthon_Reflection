<template>
    <el-row alignment="flex-start">
      <el-col
      v-for="file in store.state.appStore.Files" :key="file.hash"
        :xs="8" :sm="4" :md="4" 
        style="padding: 9px;">
        <router-link :to="'/movdetail/'+file.hash" style="text-decoration: none;" target="_blank">   
        <el-card
        class="box-card" 
        shadow="hover"
        :body-style="{ padding: '8px 5px' }">
        <div class="card-div">
          <img src="../../assets/logo.png" class="card-image"/>
          <span class="card-remark">{{ file.hash.substring(0,6) }}</span>
        </div>
      
        <div style="padding: 0px;">
          
          <span style="line-height: 26px; font-size: 15px; color:#777; display: flex; margin-top: 4px; text-overflow: ellipsis; overflow: hidden; width: 80%; white-space: nowrap;">
            <el-tooltip class="box-item" effect="dark" :content="file.hash" placement="bottom-end" :show-after="1000">
            {{ file.hash.substring(0,6) }}
            </el-tooltip>
          </span>
        </div>
      </el-card>
      </router-link>
      </el-col>
   </el-row>
  </template>
  
  <script>
  import { create } from 'ipfs-http-client'
  import { ref, reactive,computed} from 'vue'
  import { useStore } from 'vuex'  

  
  
  export default {
    setup() {
      const store = useStore()
      let Files = computed(() => store.state.appStore.Files).value
      console.log('Files:', Files);
      async function getFiles(hashes) {
        const ipfs = await create({ url: 'http://localhost:5001' })
  
        for (const hash of hashes) {
          if (Files.some(file => file.hash === hash)) {
          continue
        }
          try {
            const stream = await ipfs.cat(hash)
            let data = [];
          for await (const chunk of stream) {
          data.push(chunk);
            }
            let concatenated = new Uint8Array(data.reduce((acc, arrayBuffer) => acc.concat(Array.from(new Uint8Array(arrayBuffer))), []));
            let singleArrayBuffer = concatenated.buffer;
            const blob = new Blob([singleArrayBuffer], { type: 'video/mp4' }) 
            console.log(blob)
  
            const url = URL.createObjectURL(blob)
            await store.commit('setFiles', [...Files, { hash, url }])
            Files = store.state.appStore.Files
          } catch (error) {
            console.error(`Cannot get file with hash ${hash}:`, error)
          }
        }
      }
  
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
        .then(async(pins) => {await getFiles(pins)
          Files = store.state.appStore.Files
      }
        )
        .catch(error => console.error(error))
      return {
        store
            }
    }
  }
  </script>
  <style>
span.home-card-type {
    float: left;
    margin: 10px;
    font-size: 20px; 
    font-weight: bold;
    line-height: 20px;
}

.home-card-type {
    float: left;
    margin: 10px;
    line-height: 20px;
}

a.home-card-type:hover {
    color:rgb(36, 184, 242) !important;
}
a.search-type:hover {
    color: rgb(36, 184, 242);
}

a.search-type.active {
  background-color: rgb(36, 184, 242);
  color: white;
  border-radius: 4px;
}

.bottom {
  margin-top: 0px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

div.card-div {
    position: relative;
    width: 100%;
    height: 0;
    overflow: hidden;
    padding-bottom: 130%;
    /* background-color: #ececec; */
}

img.card-image {
  width: 95%;
  height: auto;
  display: block;
  margin: 0 auto;
  /* aspect-ratio: 70/89;  */
  object-fit: cover;
}

span.card-remark {
    position: absolute;
    right: 4px;
    bottom: 4px;
    padding: 2px 6px;
    background: rgba(0,0,0,.8);
    color: #fff;
    border-radius: 2px;
    font-size: 13px;
}

.el-card.box-card {
  width: 100%;
  border-radius: 4px 4px 0 0;
  /* margin: 11px; */
  background-color: white;
  /* border-style: none; */
}
</style>
  