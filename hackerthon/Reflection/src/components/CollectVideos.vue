<template>  
  <div class="collect-card">
    <el-row style="margin: 15px 0 0 0">
        <span class="collect-card-type">我的token</span>
    </el-row>
    <el-row class="Token-List">
      <div class="uploadnote">
        <h3>Token铸造</h3>
        <p>Reflection会根据你上传的视频质量（根据点击数、播放率、以及转发、点赞等数据来进行评估）来为你铸造（wrap）你独有的NFT。</p>
        <strong>在调用wrap时会评估你前端时间的视频质量来进行铸造token。<br>(过程中会收取一些手续费，默认扣除1eth，铸造结束后将多余金额转回你的钱包)</strong><br>
        <br><strong>在调用unwrap时会评估你token铸造时的价值以及最近的视频质量进行估价，最终从合约中扣除相应金额发送到你的账户中。</strong>
      </div>
      <el-col><strong>userAddress:</strong>{{tokenUser.useraddress}}</el-col>
      <el-col><strong>Token:</strong>{{ tokenUser.IsHolding ? tokenUser.tokenid==0 ? 1 : tokenUser.tokenid :'未铸造'}}</el-col>
      <el-col></el-col>
    </el-row>
    
    <button class="contract-btn" @click="getuser">getuser</button>
    <button class="contract-btn" @click="wrap">wrap</button>
    <button class="contract-btn" @click="unwrap">unwrap</button>

  <el-backtop :right="50" :bottom="80" />
  <!-- <p v-show="infiniteMsgShow" class="tips" style="font-size:smaller; color:#777;">Loading...</p>
  <p v-show="!infiniteMsgShow" class="tips" style="font-size:smaller; color:#777;">到底啦</p> -->
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import Videolist from '../views/video/Videolist.vue'
import { ethers } from 'ethers';
import { Web3Provider } from "@ethersproject/providers";
import web3 from 'web3'
import AgencyImp from'../artifacts/contracts/ReflectionAgencyImp.sol/AgencyImp.json'

export default {
    name: "CollectVideos",
    props: {
        user_id: String
    },
    components: {
    },
    data(){
      return {
        dataarr:[1,2,3,4,6,7,8,9,10]
      }
    },
    setup() {
      const tokenUser = ref('userToken')
      async function getAccount() {
    // 检查浏览器是否已经安装了MetaMask
        if (typeof window.ethereum !== 'undefined') {
        // 请求用户授权
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        // accounts数组中的第一个元素就是用户的账户地址
        const account = accounts[0];
        console.log(account);
        return account;
        } else {
        console.log('请先安装MetaMask');
        return null;
       }
      }
      async function getuser(){
        const account = await getAccount();
            if (account) {
                const contractAddress = import.meta.env.VITE_APP_AGENCY_ADDRESS;
                const contractAbi = [
                    ...AgencyImp.abi
                ];
              console.log(account);
                const provider = await new Web3Provider(window.ethereum);
                const signer = await provider.getSigner()
                const newsinger = {...signer}
                newsinger._address = account
                console.log(newsinger);
                const contract = await new ethers.Contract(contractAddress, contractAbi,signer);
                tokenUser.value = await contract.getparticipated(account)
                console.log(tokenUser.value);
      }
      else{
        return
      }
    }
    async function wrap() {
            const account = await getAccount();
            if (account) {
                const contractAddress = import.meta.env.VITE_APP_AGENCY_ADDRESS;
                const contractAbi = [
                    ...AgencyImp.abi
                ];
              console.log(account);
                const provider = await new Web3Provider(window.ethereum);
                const signer = await provider.getSigner()
                const newsinger = {...signer}
                newsinger._address = account
                console.log(newsinger);
                const contract = await new ethers.Contract(contractAddress, contractAbi,signer);
                const wei = web3.utils.toWei('1', 'ether');
                const abidata = ethers.encodeBytes32String(1)
                try
                {
                  const result = await contract.wrap(account,abidata,{value:wei}) 
                console.log(result);
              }
                catch(err){
                  console.log(err);
                }
            }
        }
    async function unwrap() {
            const account = await getAccount();
            if (account) {
                const contractAddress = import.meta.env.VITE_APP_AGENCY_ADDRESS;
                const contractAbi = [
                    ...AgencyImp.abi
                ];
                const provider = await new Web3Provider(window.ethereum);
                const signer = await provider.getSigner()
                const newsinger = {...signer}
                newsinger._address = account
                const contract = await new ethers.Contract(contractAddress, contractAbi,signer);
                const abidata = ethers.encodeBytes32String(5)
                try
                {
                  const result = await contract.unwrap(account,tokenUser.value.tokenid,abidata) 
                console.log(result);
              }
                catch(err){
                  console.log(err);
                }
            }
        }
        return{
          getuser,
          wrap,
          unwrap,
          tokenUser
        }
  }
}
</script>


<style>
span.collect-card-type {
    float: left;
    margin: 10px;
    font-size: 20px; 
    font-weight: bold;
    line-height: 20px;
}
.Token-List{
  margin: 10px auto;
  width: 1000px;
  border: 1px solid #e2e7eb;}
  .contract-btn{
    margin: 10px 10px;
    width: 80px;
    height: 30px;
    border: none;
    color: white;
    border-radius: 5px;
    background-color: rgb(84, 174, 247);
    font-weight: 600;
  }
  .contract-btn:hover{
    background-color: rgb(247, 84, 190);
  }
</style>
