<template>
  <el-menu
    :default-active="activeIndex"
    background-color="white"
    text-color="black"
    active-text-color="#24b8f2"
    :router="true"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="true"
    @select="handleSelect"
  >
    <el-menu-item index="/" style="font-size:larger; color:#409EFF; ">Reflection</el-menu-item>
    <el-menu-item index="/video">创作中心</el-menu-item>
    <el-menu-item index="/personSapce">个人中心</el-menu-item>
    <div class="menu-input">
      <el-input
        v-model="input"
        placeholder="Search"
        style = "width: 80%; margin-left: 3%"
        @keyup.enter="searchChange"
        :suffix-icon="Search"
      />
    </div>
    <div style="position: absolute; right: 0px;">
        <el-dropdown class="login-out" style="margin: 15px 11px" v-if="show"  trigger="click">
          <span class="el-dropdown-link">
            {{ user.name }}
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="loginOut">
                  登出
		          </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <el-button link type="primary" class="login" style="margin: 15px 11px; color: black" v-else @click="handlegetAccount">
            连接账户
        </el-button>
    </div>
  </el-menu>
</template>

<script>
// 导航栏
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { ethers } from 'ethers';
import { Web3Provider } from "@ethersproject/providers";

import web3 from 'web3'
import AgencyImp from'../artifacts/contracts/ReflectionAgencyImp.sol/AgencyImp.json'
export default {
    name: "SakuraMenu",
    setup() {
        const show = ref(false)
        const store = useStore()
        const router = useRouter()
        // console.log(router.currentRoute.value)
        const activeIndex = ref('/')
        // console.log(activeIndex.value)
        // console.log(router.currentRoute.value)
        const input = ref('')
        const isLogining = ref(false)
        async function getAccount() {
        if (window.ethereum) {
        try {
            // 请求用户授权
            await window.ethereum.request({ method: 'eth_requestAccounts' })
        } catch (error) {
            // 用户拒绝授权
            console.error("用户拒绝授权");
        }
    } else {
        // 非MetaMask用户
        console.error("请安装MetaMask");
    }
      }
        const loginOut = function() {
          console.log(window.ethereum);
      }

        const login = function() {

          router.push({ name: 'login' })
        }

        return {
            router,
            activeIndex,
            input,
            store,
            isLogining,
            loginOut,
            login,
            Search,
            show,
            getAccount
            }
    },

    data() {
      return {
        user: {}
      }
    },

    methods: {
      
       async handlegetAccount() {
        await this.getAccount()
       },
        handleSelect(key, keyPath)  {
            // console.log(key)
            this.activeIndex = key
            this.input = ''
          },
        
        // 输入框输入数据时 路由改变
        searchChange(value) {
          if(this.input) {
            this.activeIndex = '/'
            this.router.push({ name: 'search', query: { keyword: this.input }})
          }
        },

        ToUserCenter() {
          console.log("前往用户中心")
          this.router.push({name: 'personSapce'})
        }

    },


    mounted() {
      this.router.isReady().then(
        () => {
          var currentPath = this.$route.fullPath
          if (currentPath.indexOf('search?keyword=') > -1) {
            this.input = this.$route.query.keyword ? this.$route.query.keyword : ''
          } else if (currentPath.indexOf('/movtype/') > -1) {
            this.activeIndex = currentPath
          }
        }
        ).catch(
          () => {
            this.input = ''
            this.activeIndex = '/'
          }
        )
    },


    watch: {
      moniterLogining() {
        return this.store.state.appStore.isLogining
      }
    },

    computed: {
      moniterLogining() {
        this.isLogining = this.store.state.appStore.isLogining
      }
    }
}


</script>

<style>
.flex-grow {
  flex-grow: 1;
}


/* 取消过渡效果 */
.el-menu-item {
  border-bottom: 0 !important;
}

.el-menu-item.is-active {
  background-color: white !important;
  border-bottom: 0 !important;
}

.el-menu-item:focus {
  background-color: white !important;
}

.el-menu-item:hover {
  background-color: white !important;
  color: #24b8f2 !important;
}

/* .el-button.login:hover {
  color: #24b8f2
}

p.login-out:hover {
  color: #24b8f2
} */

.el-menu {
  border: none !important;
  height: 100%;
  position: relative;
}

.el-input {
  margin: 10px 0px;
}

div.menu-input {
  position: absolute;
  right: 10%;
  width: 25%;
}
</style>
